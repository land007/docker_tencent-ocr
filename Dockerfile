FROM land007/node:latest

MAINTAINER Jia Yiqiu <yiqiujia@hotmail.com>

RUN echo $(date "+%Y-%m-%d_%H:%M:%S") >> /.image_times && \
	echo $(date "+%Y-%m-%d_%H:%M:%S") > /.image_time && \
	echo "land007/tencent-ocr" >> /.image_names && \
	echo "land007/tencent-ocr" > /.image_name

RUN . $HOME/.nvm/nvm.sh && cd / && npm install tencentcloud-sdk-nodejs-ocr
ADD node /node_

ENV TENCENT_CLOUD_REGION=ap-beijing\
	TENCENT_CLOUD_SECRET_ID=\
	TENCENT_CLOUD_SECRET_KEY=

#docker build -t land007/tencent-ocr:latest .
#docker run -it --rm -p 13000:3000 --name tencent-ocr -e "TENCENT_CLOUD_SECRET_ID=" -e "TENCENT_CLOUD_SECRET_KEY=" land007/tencent-ocr:latest
#> docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t land007/tencent-ocr:latest --push .

