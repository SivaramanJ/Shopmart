/* groovylint-disable CompileStatic */
pipeline {
    agent {
        any {
            image 'node:14.16-alpine'
            args '-p 3000:3000'
        }
    }
    tools { nodejs 'NODEJS' }
    stages {
        stage('Build') {
            steps {
                sh 'npm i'
            }
        }
    }
}
