# Tier 1 - Frontend Dockerfile
FROM nginx:alpine

# Apni HTML file nginx ke default serving folder mein copy karo
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
