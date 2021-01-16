## nginx镜像;主要挂载说明使用文档

FROM centos:latest
MAINTAINER "andyxu<andyxmq@126.com>"

WORKDIR /usr/local/src
ENV NG_VERSION nginx-1.16.1  #定义环境变量

RUN yum -y install epel-release     #安装epel仓库
# 下载nginx.tar.gz并解压
RUN yum -y install wget
 && wget -c https://nginx.org/download/$NG_VERSION.tar.gz
 && tar xzvf $NG_VERSION.tar.gz

# 安装编译依赖包
RUN yum install -y gcc gcc-c++ make pcre pcre-devel zlib zlib-devel
RUN yum clean all  #清理仓库
RUN useradd -M -s /sbin/nologin nginx   #创建nginx用户
WORKDIR /usr/local/src/$NG_VERSION   #切换工作目录

#编译安装nginx
RUN ./configure --prefix=/usr/local/nginx && make && make install

ADD index.html /usr/local/nginx/html   #复制测试页面到容器中
VOLUME /usr/local/nginx/html            #设置容器中要挂在到宿主机的目录
ENV PATH /usr/local/nginx/sbin:$PATH #设置sbin环境变量

EXPOSE 80/tcp                              #暴露80端口
ENTRYPOINT ["nginx"]                  
CMD ["-g","daemon off;"]