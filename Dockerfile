FROM 035592488042.dkr.ecr.us-west-2.amazonaws.com/cis/nginx-ubuntu1804:14032022
RUN rm -rf /etc/nginx/conf.d
COPY web_server_conf /etc/nginx
WORKDIR  /usr/share/nginx/html/
COPY ./kxRunner.sh .
RUN chmod +x kxRunner.sh
COPY .env .
COPY ./build .
EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/kxRunner.sh && nginx -g \"daemon off;\""]
