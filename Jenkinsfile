pipeline {
    agent any // Run on any available agent

    environment {
        DOCKER_IMAGE_NAME = "my-jenkins-test-app"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the source code..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Building the Docker image..."
                // We build the image once and will reuse it for testing and deploying
                sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ."
            }
        }

        // This is the new stage to run our automated tests
        stage('Test') {
            steps {
                echo "Running tests inside a temporary container..."
                // This command starts a temporary container from the image we just built.
                // It overrides the default command and instead runs 'npm test'.
                // If the tests fail, this command will error out and stop the pipeline.
                sh "docker run --rm ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} npm test"
            }
        }

        stage('Deploy') {
            steps {
                echo "Tests passed! Deploying the application..."
                sh "docker stop ${DOCKER_IMAGE_NAME} || true"
                sh "docker rm ${DOCKER_IMAGE_NAME} || true"
                // Use a new port like 8082 to avoid conflicts with your other apps
                sh "docker run -d --name ${DOCKER_IMAGE_NAME} -p 8082:3000 ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
        }
    }
}
