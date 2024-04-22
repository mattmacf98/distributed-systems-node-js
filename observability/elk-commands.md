docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -p 7777:7777/udp \
-v $PWD/observability/udp.conf:/etc/logstash/conf.d/99-input-udp.conf \
-e MAZ_MAP_COUNT=262144 \
-it --name distnode-elk sebp/elk:683
