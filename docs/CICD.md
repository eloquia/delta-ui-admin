# CI/CD

CI/CD for the Delta Admin UI will follow the steps below:

1. When a merge is made to `main` branch, a Webhook to Travis CI will start a pipeline.
2. That Travis CI pipeline will run quality checks
3. That Travis CI pipeline will also containerize the Vue 3 application
4. That Travis CI pipeline will then upload that container to a private container registry

At some point we will also create a Helm chart and deploy the chart to that container registry as well. Likewise a Kubernetes Deployment could also take its place.
