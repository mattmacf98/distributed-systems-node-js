docker run -p 8080:80 -p 8125:8125/udp -it --name distnode-graphite graphiteapp/graphite-statsd:1.1.6-1

docker run -p 8000:3000 -it --name distnode-grafana grafana/grafana:6.5.2
