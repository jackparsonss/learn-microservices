# Use an existing docker image as a base 
FROM alpine  

# Download and install a dpenedency
RUN apk add --update redis

# Tell image what to do when it starts a container
CMD ["redis-server"]
