FROM python:3-alpine

WORKDIR /usr/src/app

VOLUME /usr/src/app/pages

COPY . .

RUN apk add --update python python-dev py-pip build-base \
    && pip install --no-cache-dir -r requirements.txt \
    && rm -rf /var/cache/apk/* \
    && apk del build-base python-dev

ENV host=0.0.0.0 \
    port=80 \
    debug=false

EXPOSE 80

CMD [ "python", "./gyro.py" ]