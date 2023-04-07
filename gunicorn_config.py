bind = "0.0.0.0:8080"
workers = 4

# gunicorn --worker-tmp-dir /dev/shm app:app
# gunicorn -k gevent -w 1 --worker-connections 1000 app:app 