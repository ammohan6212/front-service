<<<<<<< HEAD
@Library('microservice@main') _ 

pipeline {
    agent any
     parameters([
        string(name: 'GITHUB_REPO', defaultValue: '', description: 'GitHub repository URL')
    ])
    

    stages {
        stage("Load project configuration"){
            steps{
                script{
                    def projectConfig = readJSON file: 'config.json'
                    // env.service_name = projectConfig.serviceName
                    // env.notificationRecipients = projectConfig.notificationRecipients
                    // env.docker_username=projectConfig.docker_username
                    // env.kubernetes_endpoint=projectConfig.kubernetes_endpoint
                    // env.bucket_name=projectConfig.bucket_name 
                    // env.bucket_path=projectConfig.bucket_path   
                    // env.docker_credentials=projectConfig.docker_credentials
                    // env.docker_registry=projectConfig.docker_registry
                    // env.kubernetesClusterName=projectConfig.kubernetesClusterName
                    // env.kubernetesCredentialsId=projectConfig.kubernetesCredentialsId
                    // env.kubernetesCaCertificate=projectConfig.kubernetesCaCertificate
                    // env.gcp_credid=projectConfig.gcp_credid
                    // env.aws_credid=projectConfig.aws_credid
                }
            }
        }
        stage("Development Workflow") {
=======
pipeline{
    agent any

    stages{
        stage("Clone the Repository") {
>>>>>>> parent of e5b7f7a (pugh)
            agent any
            when {
                branch 'dev'
            }
<<<<<<< HEAD
            stages {
                stage("Clone Dev Repo & Get Version") {
                    steps {
                        script{
                            // Clone the dev branch
                            git branch: "${env.BRANCH_NAME}",url: "${params.GITHUB_REPO}"
                            // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                            // Fetch all tags
                            sh 'git fetch --tags'

                            // Get the latest tag correctly
                            def version = sh(
                                script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                                returnStdout: true
                            ).trim()
                            env.version = version
                            echo "VERSION=${env.VERSION}"
                        }
                    }
                }
                stage("Detect Programming Language") {
                    steps {
                        detectLanguage() // Calls vars/detectLanguage.groovy
                    }
                }
                stage("Linting the Code") {
                    steps {
                        runLinter(env.DETECTED_LANG)
                    }
                }
                stage("Infrastructure Linting") {
                    steps {
                        runInfrastructureLinting('terraform/') // Pass the path to your infrastructure code
                    }
                }
                stage("Perform Kubernetes Linting") {
                    steps {
                        runKubernetesLinting('kubernetes/') // Pass the path to your Kubernetes manifests
                    }
                }
                stage("Perform Docker Linting & Validation") {
                    steps {
                        validateDockerImage('Dockerfile') // Validates the Dockerfile itself
                    }
                }
                stage("YAML or JSON Schema Validation") {
                    steps {
                        // Example: Adjust to your specific YAML/JSON files and schemas
                        // performYamlJsonValidation('config.yaml', 'schemas/config_schema.json')
                        echo "Skipping general YAML/JSON validation (add specific calls here)."
                    }
                }
                stage("Secrets Detection") {
                    steps {
                        performSecretsDetection('.') // Scan the entire workspace
                    }
                }
                stage("Install Dependencies") {
                    steps {
                        installAppDependencies(env.DETECTED_LANG)
                    }
                }
                stage("Dependency Scanning / SCA") {
                    steps {
                        performDependencyScan(env.DETECTED_LANG)
                    }
                }
                stage("Type Checking") {
                    steps {
                        runTypeChecks(env.DETECTED_LANG)
                    }
                }
                stage("Perform Unit Tests") {
                    steps {
                        runUnitTests(env.DETECTED_LANG)
                    }
                }
                stage("Test Code Coverage Calculation") {
                    steps {
                        calculateCodeCoverage(env.DETECTED_LANG)
                    }
                }
                stage("Perform Static Code Analysis using SonarQube") {
                    steps {
                        runSonarQubeScan(env.SONAR_PROJECT_KEY)
                    }
                }
                stage("Mutation Testing at Dev") {
                    steps {
                        runMutationTests(env.DETECTED_LANG)
                    }
                }
                stage("Snapshot Testing at Dev") {
                    steps {
                        runSnapshotTests(env.DETECTED_LANG)
                    }
                }
                stage("Component Testing at Dev") {
                    steps {
                        runComponentTests(env.DETECTED_LANG)
                    }
                }
                stage("Feature Flag Verification at Dev") {
                    steps {
                        verifyFeatureFlags(env.DETECTED_LANG)
                    }
                }
                stage("Building the Application") {
                    steps {
                        buildApplication(env.DETECTED_LANG)
                    }
                }
                stage("Create Archiving File") {
                    steps {
                        createArchive("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", 'src/')
                    }
                }
                stage("Push Artifact to Storage") {
                    steps {
                        pushArtifact("${env.service_name}-${env.version}-${env.BRANCH_NAME}.zip", "s3://${env.AWS_S3_BUCKET}/${env.AWS_S3_PATH}") // Example for S3
                    }
                }
                stage("Perform Docker Image Build") {
                    steps {
                        buildDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}", ${env.version}, '.')
                    }
                }
                stage("Docker Image Validation") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Trivy)") {
                    steps {
                        scanContainerTrivy("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Snyk)") {
                    steps {
                        scanContainerSnyk("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", "Dockerfile")
                    }
                }
                stage("Perform Container Scanning (Docker Scout)") {
                    steps {
                        scanContainerDockerScout("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Grype)") {
                    steps {
                        scanContainerGrype("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Syft & Dockle)") {
                    steps {
                        scanContainerSyftDockle("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Integration with Docker Containers") {
                    steps {
                        integrationWithDocker()
                    }
                }
                stage("UI/Component Testing") {
                    steps {
                        runUiComponentTests(env.DETECTED_LANG)
                    }
                }
                stage("Static Security Analysis") {
                    steps {
                        performStaticSecurityAnalysis(env.DETECTED_LANG)
                    }
                }
                stage("Chaos Testing") {
                    steps {
                        runChaosTests(env.DETECTED_LANG)
                    }
                }
                stage("Push Docker Image to dev env Registry") {
                    steps {
                        pushDockerImageToRegistry("${env.docker_registr}", "${env.docker_credentials}", "${env. DOCKER_USERNAME}${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Deploy to Dev") {
                    steps {
                       withKubeConfig(
                            caCertificate: env.kubernetesCaCertificate, // Now dynamic
                            clusterName: env.kubernetesClusterName,     // Now dynamic
                            contextName: '',
                            credentialsId: env.kubernetesCredentialsId, // Now dynamic
                            namespace: "${env.BRANCH_NAME}",
                            restrictKubeConfigAccess: false,
                            serverUrl: env.kubernetes_endpoint
                        ) {
                            // Change Kubernetes service selector to route traffic to Green
                            sh """kubectl apply -f blue-load.yml -n ${KUBE_NAMESPACE}"""
                        }
                    }
                }
                stage("Perform Smoke Testing After Dev Deploy") {
                    steps {
                        performSmokeTesting(env.DETECTED_LANG)
                    }
                }
                stage("Perform Sanity Testing After Dev Deploy") {
                    steps {
                        performSanityTesting(env.DETECTED_LANG)
                    }
                }
                stage("Perform API Testing After Dev Deploy") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("Perform Integration Testing After Dev Deploy") {
                    steps {
                        performIntegrationTesting(env.DETECTED_LANG)
                    }
                }
                stage("Perform Light UI Tests After Dev Deploy") {
                    steps {
                        performLightUiTests(env.DETECTED_LANG)
                    }
                }
                stage("Perform Regression Testing After Dev Deploy") {
                    steps {
                        performRegressionTesting(env.DETECTED_LANG)
                    }
                }
                stage("Perform Feature Flag Checks After Dev Deploy") {
                    steps {
                        performFeatureFlagChecks(env.DETECTED_LANG)
                    }
                }
                stage("Perform Security Checks After Dev Deploy") {
                    steps {
                        performSecurityChecks(env.DETECTED_LANG)
                    }
                }
                stage("Perform Chaos Testing After Dev Deploy") {
                    steps {
                        performChaosTestingAfterDeploy(env.DETECTED_LANG)
                    }
                }
                stage("Perform Logging and Monitoring Checks After Dev Deploy") {
                    steps {
                        performLoggingMonitoringChecks()
                    }
                }
                stage("Perform Light Load/Performance Testing After Dev Deploy") {
                    steps {
                        performLoadPerformanceTesting(env.DETECTED_LANG)
                    }
                }
                stage("Need the manual approval to complete the dev env"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("Manual Approval for Dev Stage") {
                    steps {
                        input message: "Does everything working fine here", ok: "Deploy Now", submitter: "manager,admin"
                    }
                }
                stage("Generate Version File Dev Env") {
                    agent { label 'security-agent'} // Use a specific agent if needed
                    steps {
                        generateVersionFile('gcp', "${env.bucket_name}", "${gcp_credid}")

                    }
=======
            steps {
                script{
                    // Clone the dev branch
                    git branch: 'dev',url: "https://github.com/ammohan6212/front-end.git"
                    // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                    // Fetch all tags
                    sh 'git fetch --tags'

                    // Get the latest tag correctly
                    def version = sh(
                        script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                        returnStdout: true
                    ).trim()
                    
                    // Make version available as environment variable
                    env.version = version

                    
                    echo "VERSION=${env.VERSION}"
                }
                
            }
        }

        stage('get the current application version'){
            when {
                branch 'dev'
            }
            steps{
                script{
                    echo "VERSION=${env.version}"
                }
            }
        }
        stage("linting the code"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    npx eslint --init
                    npm init @eslint/config@latest
                    npm audit fix --force
                    """
                }
            }
        }
        stage("infrastrucure linting"){
            when {
                branch 'dev'
            }
            steps {
                script{
                    sh """
                    #tflint  terraform/
                    """
                }
            }
        }
        stage("perform the code kubeernetes linintg"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    # .gobin/kube-linter kubernetes/
                    """
                }
            }
        }
        stage("perform the docker linting"){
            when{
                branch 'dev'
            }
            steps {
                script{
                    sh """
                    docker pull hadolint/hadolint
                    docker run --rm -i hadolint/hadolint < dockerfile

                    npm install --global dockerlinter
                    dockerlinter -f Dockerfile
                    """
                }
            }
        }
        stage("yaml or json schema valdiation"){
            when{
                branch 'dev'
            }
            steps {
                script{
                    sh """
                    """
                }
            }
        }
        stage("secretes detection"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    gitleaks detect --source=. --verbose --redact
                    trufflehog filesystem . --no-update
                    """
                }
            }
        }
        stage("install the dependencies"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    npm install
                    """
                }
            }
        }
        stage("dependendency scanning or software composition analyssis"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    npm audit
                    npm install --save-dev jest supertest
                    npm audit fix
                    snyk test --file=package.json
                    dependency-check.sh --project NodeApp --scan ./ --format ALL
                   """
                }
            }
        }
        stage("type checking"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("perform the unit tests"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    npm test
                    """
                }
            }
        }
         stage("test code coverage calvulation"){
            when {
                branch 'dev'
            }
            steps{
                script {
                    sh """
                    npm run test:coverage
                    """
                }
            }
        }
        stage("perform the static code analysis using sonarqueb"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    /opt/sonar-scanner/bin/sonar-scanner
                    """
                }
            }
        }
        stage("mutation testing"){
            when {
                branch 'dev'
            }
            steps {
                script{
                    sh """
                    npx stryker run
                    """
                }
            }
        }
        stage("snap shot testing"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    npm run test:snapshot
                    """
                }
            }
        }
        stage("building the application"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("create the archiving file"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    zip -r src.zip src/
                    """
                }
            }
        }
        stage("push the artifact to the nexus or jfrog or other artifact storage platforms"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("perform the docker image build"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    docker build -t frontend:${env.version} .
                    """
                }
            }
        }
        stage("docker linting and  image validation"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    docker image inspect myapp:${env.version}
                    """
>>>>>>> parent of e5b7f7a (pugh)
                }
            }
        }

<<<<<<< HEAD
        stage("Test Environment Workflow") {
            when {
                branch 'test'
            }
            stages {
                stage("send the alert mail to start the test env"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("Manual Approval to Start Test Env") {
                    steps {
                        input message: "Do you approve deployment to test?", ok: "Deploy Now", submitter: "manager,admin"
                    }
                }
                stage("Clone Repo with Test Branch & Get Version") {
                    steps {
                        script{
                            // Clone the dev branch
                            git branch: "${env.BRANCH_NAME}",url: "${env.github_repo}"
                            // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                            // Fetch all tags
                            sh 'git fetch --tags'

                            // Get the latest tag correctly
                            def version = sh(
                                script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                                returnStdout: true
                            ).trim()
                            env.version = version
                            echo "VERSION=${env.VERSION}"
                        }
                    }
                }
                stage("Static Code Analysis at Test") {
                    steps {
                        runSonarQubeScan(env.SONAR_PROJECT_KEY)
                    }
                }
                stage("Unit Test Analysis at Test") {
                    steps {
                        runUnitTests(env.DETECTED_LANG)
                    }
                }
                stage("Install Dependencies and Scan Dependencies at Test") {
                    steps {
                        installAppDependencies(env.DETECTED_LANG)
                        performDependencyScan(env.DETECTED_LANG)
                    }
                }
                stage("Code Coverage at Test") {
                    steps {
                        calculateCodeCoverage(env.DETECTED_LANG)
                    }
                }
                stage("Create Archiving File at Test Stage") {
                    steps {
                        createArchive("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", 'src/')
                    }
                }
                stage("Push Artifact to Storage at Test Stage") {
                    steps {
                        pushArtifact("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", "s3://${env.AWS_S3_BUCKET}/${env.AWS_S3_PATH}")
                    }
                }
                stage("Perform Docker Image Build for Test Env") {
                    steps {
                        buildDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}", env.VERSION_TAG, '.')
                    }
                }
                stage("Docker Linting and Image Validation at Test Env") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Trivy) at Test Env") {
                    steps {
                        scanContainerTrivy("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Snyk) at Test Env") {
                    steps {
                        scanContainerSnyk("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", "Dockerfile")
                    }
                }
                stage("Perform Container Scanning (Docker Scout) at Test Env") {
                    steps {
                        scanContainerDockerScout("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Grype) at Test Env") {
                    steps {
                        scanContainerGrype("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Syft & Dockle) at Test Env") {
                    steps {
                        scanContainerSyftDockle("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Push Docker Image to Preprod Registry") {
                    steps {
                        pushDockerImageToRegistry("${env.docker_registr}", "${env.docker_credentials}", "${env. DOCKER_USERNAME}${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Deploy to test") {
                    steps {
                        withKubeConfig(
                            caCertificate: env.kubernetesCaCertificate, // Now dynamic
                            clusterName: env.kubernetesClusterName,     // Now dynamic
                            contextName: '',
                            credentialsId: env.kubernetesCredentialsId, // Now dynamic
                            namespace: "${env.BRANCH_NAME}",
                            restrictKubeConfigAccess: false,
                            serverUrl: env.kubernetes_endpoint
                        ){
                            // Change Kubernetes service selector to route traffic to Green
                            sh """kubectl apply -f blue-load.yml -n ${KUBE_NAMESPACE}"""
                        }
                    }
                }
                stage("Smoke Test in Test Env") {
                    steps {
                        performSmokeTesting(env.DETECTED_LANG)
                    }
                }
                stage("Sanity Tests in Test Env") {
                    steps {
                        performSanityTesting(env.DETECTED_LANG)
                    }
                }
                stage("Full Integration Tests in Test Env") {
                    steps {
                        performIntegrationTesting(env.DETECTED_LANG)
                    }
                }
                stage("Functional Testing in Test Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG) // Reusing API testing for functional tests
                    }
                }
                stage("API Testing in Test Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("Regression Testing in Test Env") {
                    steps {
                        performRegressionTesting(env.DETECTED_LANG)
                    }
                }
                stage("Database Testing in Test Env") {
                    steps {
                        performDatabaseTesting()
                    }
                }
                stage("Generate Version File Test Env") {
                    steps {
                        generateVersionFile('gcp', "${env.bucket_name}", "${gcp_credid}")
                    }
                }
                stage("Need the manual approval to complete the test env"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("Approval for Test Success") {
                    steps {
                        input message: "Do you approve to proceed to Staging Environment?", ok: "Approve", submitter: "manager,admin"
                    }
                }
            }
        }

        stage("Staging Environment Workflow Management") {
            when {
                branch 'stag'
            }
            stages {
                stage("Approval Before Deploying to QA Staging") {
                    steps {
                        input message: "Do you approve deployment to Staging?", ok: "Deploy Now", submitter: "manager,admin"
                    }
                }
                stage("Clone Repo with Staging Branch & Get Version") {
                    steps {
                        script{
                            // Clone the dev branch
                            git branch: "${env.BRANCH_NAME}",url: "${env.github_repo}"
                            // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                            // Fetch all tags
                            sh 'git fetch --tags'

                            // Get the latest tag correctly
                            def version = sh(
                                script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                                returnStdout: true
                            ).trim()
                            env.version = version
                            echo "VERSION=${env.VERSION}"
                        }
                    }
                }
                stage("Detect Programming Language") {
                    steps {
                        detectLanguage() // Calls vars/detectLanguage.groovy
                    }
                }
                stage("Static Code Analysis at Staging") {
                    steps {
                        runSonarQubeScan(env.SONAR_PROJECT_KEY)
                    }
                }
                stage("Unit Test Analysis at Staging") {
                    steps {
                        runUnitTests(env.DETECTED_LANG)
                    }
                }
                stage("Install Dependencies and Scan Dependencies at Staging") {
                    steps {
                        installAppDependencies(env.DETECTED_LANG)
                        performDependencyScan(env.DETECTED_LANG)
                    }
                }
                stage("Code Coverage at Staging") {
                    steps {
                        calculateCodeCoverage(env.DETECTED_LANG)
                    }
                }
                stage("Create Archiving File at Staging Env") {
                    steps {
                        createArchive("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", 'src/')
                    }
                }
                stage("Push Artifact to Storage at Staging") {
                    steps {
                        pushArtifact("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", "s3://${env.AWS_S3_BUCKET}/${env.AWS_S3_PATH}")
                    }
                }
                stage("Perform Docker Image Build for Staging Env") {
                    steps {
                        buildDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}", env.version, '.')
                    }
                }
                stage("Docker Linting and Image Validation at Staging Env") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Trivy) at Staging Env") {
                    steps {
                        scanContainerTrivy("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Snyk) at Staging Env") {
                    steps {
                        scanContainerSnyk("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", "Dockerfile")
                    }
                }
                stage("Perform Container Scanning (Docker Scout) at Staging Env") {
                    steps {
                        scanContainerDockerScout("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Grype) at Staging Env") {
                    steps {
                        scanContainerGrype("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Syft & Dockle) at Staging Env") {
                    steps {
                        scanContainerSyftDockle("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Push Docker Image to stag Registry") {
                    steps {
                        pushDockerImageToRegistry("${env.docker_registr}", "${env.docker_credentials}", "${env. DOCKER_USERNAME}${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Deploy to stagging") {
                    steps {
                        withKubeConfig(
                            caCertificate: env.kubernetesCaCertificate, // Now dynamic
                            clusterName: env.kubernetesClusterName,     // Now dynamic
                            contextName: '',
                            credentialsId: env.kubernetesCredentialsId, // Now dynamic
                            namespace: "${env.BRANCH_NAME}",
                            restrictKubeConfigAccess: false,
                            serverUrl: env.kubernetes_endpoint
                        ) {
                            // Change Kubernetes service selector to route traffic to Green
                            sh """kubectl apply -f blue-load.yml -n ${KUBE_NAMESPACE}"""
                        }
                    }
                }
                stage("Smoke Test in Staging Env") {
                    steps {
                        performSmokeTesting(env.DETECTED_LANG)
                    }
                }
                stage("Sanity Tests in Staging Env") {
                    steps {
                        performSanityTesting(env.DETECTED_LANG)
                    }
                }
                stage("Full Integration Tests in Staging Env") {
                    steps {
                        performIntegrationTesting(env.DETECTED_LANG)
                    }
                }
                stage("Functional Testing in Staging Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("API Testing in Staging Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("Regression Testing in Staging Env") {
                    steps {
                        performRegressionTesting(env.DETECTED_LANG)
                    }
                }
                stage("Database Testing in Staging Env") {
                    steps {
                        performDatabaseTesting()
                    }
                }
                stage("Generate Version File Staging Env") {
                    agent { label 'security-agent'}
                    steps {
                        generateVersionFile('gcp', "${env.bucket_name}", "${gcp_credid}")
                    }
                }
                stage("Need the manual approval to complete the stag env"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("Approval for Staging Success") {
                    steps {
                        input message: "Do you approve to proceed to Production Environment?", ok: "Approve", submitter: "manager,admin"
                    }
                }
            }
        }

        stage("preProduction Deployment Workflow") {
            when {
                branch 'preprod' // Or 'master'
            }
            stages {
                stage("Approval Before Deploying to preprod Production") {
                    steps {
                        input message: "Do you approve deployment to Production?", ok: "Deploy Now", submitter: "manager,admin"
                    }
                }
                stage("Clone Repo with Main Branch & Get Version") {
                    steps {
                        script{
                            // Clone the dev branch
                            git branch: "${env.BRANCH_NAME}",url: "${env.github_repo}"
                            // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                            // Fetch all tags
                            sh 'git fetch --tags'

                            // Get the latest tag correctly
                            def version = sh(
                                script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                                returnStdout: true
                            ).trim()
                            env.version = version
                            echo "VERSION=${env.VERSION}"
                        }
                    }
                }
                stage("Detect Programming Language") {
                    steps {
                        detectLanguage() // Calls vars/detectLanguage.groovy
                    }
                }
                stage("Static Code Analysis at Staging") {
                    steps {
                        runSonarQubeScan(env.SONAR_PROJECT_KEY)
                    }
                }
                stage("Unit Test Analysis at Staging") {
                    steps {
                        runUnitTests(env.DETECTED_LANG)
                    }
                }
                stage("Install Dependencies and Scan Dependencies at Staging") {
                    steps {
                        installAppDependencies(env.DETECTED_LANG)
                        performDependencyScan(env.DETECTED_LANG)
                    }
                }
                stage("Code Coverage at Staging") {
                    steps {
                        calculateCodeCoverage(env.DETECTED_LANG)
                    }
                }
                stage("Create Archiving File at Staging Env") {
                    steps {
                        createArchive("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", 'src/')
                    }
                }
                stage("Push Artifact to Storage at Staging") {
                    steps {
                        pushArtifact("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", "s3://${env.AWS_S3_BUCKET}/${env.AWS_S3_PATH}")
                    }
                }
                stage("Perform Docker Image Build for preprod Env") {
                    steps {
                        buildDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}", env.version, '.')
                    }
                }
                stage("Docker Linting and Image Validation at Staging Env") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Trivy) at Staging Env") {
                    steps {
                        scanContainerTrivy("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Snyk) at Staging Env") {
                    steps {
                        scanContainerSnyk("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", "Dockerfile")
                    }
                }
                stage("Perform Container Scanning (Docker Scout) at Staging Env") {
                    steps {
                        scanContainerDockerScout("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Grype) at Staging Env") {
                    steps {
                        scanContainerGrype("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Syft & Dockle) at Staging Env") {
                    steps {
                        scanContainerSyftDockle("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Final Docker Image Validation") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Push Docker Image to preprod Registry") {
                    steps {
                        pushDockerImageToRegistry("${env.docker_registr}", "${env.docker_credentials}", "${env. DOCKER_USERNAME}${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Deploy to preprod") {
                    steps {
                        withKubeConfig(
                            caCertificate: env.kubernetesCaCertificate, // Now dynamic
                            clusterName: env.kubernetesClusterName,     // Now dynamic
                            contextName: '',
                            credentialsId: env.kubernetesCredentialsId, // Now dynamic
                            namespace: "${env.BRANCH_NAME}",
                            restrictKubeConfigAccess: false,
                            serverUrl: env.kubernetes_endpoint
                        ){
                            // Change Kubernetes service selector to route traffic to Green
                            sh """kubectl apply -f blue-load.yml -n ${KUBE_NAMESPACE}"""
                        }
                    }
                }
                stage("Smoke Test in preProduction") {
                    steps {
                        performSmokeTesting(env.DETECTED_LANG)
                    }
                }
                stage("Sanity Test in preProduction") {
                    steps {
                        performSanityTesting(env.DETECTED_LANG)
                    }
                }

                stage("Full Integration Tests in preprod Env") {
                    steps {
                        performIntegrationTesting(env.DETECTED_LANG)
                    }
                }
                stage("Functional Testing in preprod Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("API Testing in preprod Env") {
                    steps {
                        performApiTesting(env.DETECTED_LANG)
                    }
                }
                stage("Regression Testing in preprdo Env") {
                    steps {
                        performRegressionTesting(env.DETECTED_LANG)
                    }
                }
                stage("Database Testing in preprod Env") {
                    steps {
                        performDatabaseTesting()
                    }
                }
                stage("Generate Version File preprod Env") {
                    steps {
                        generateVersionFile('gcp', "${env.bucket_name}", "${gcp_credid}")
                    }
                }
                stage("Need the manual approval to complete the stag env"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("Approval for Staging Success") {
                    steps {
                        input message: "Do you approve to proceed to Production Environment?", ok: "Approve", submitter: "manager,admin"
                    }
                }
                stage("preprod deployment status"){
                    steps{
                        echo "succefully deployed the applciation into preprod"
                    }
                }
            }
        }
        }
        stage("deploying the application into prod"){
            when {
                branch 'main' // Or 'master'
            }
            stages{
                stage("Approval Before Deploying to preprod Production") {
                    steps {
                        input message: "Do you approve deployment to Production?", ok: "Deploy Now", submitter: "manager,admin"
                    }
                }
                stage("create the change request containing what is changing and any DB changes and any downtime and rollback plan if deplyoment failes and deploymentwindow and stakeholders"){
                    steps{
                        script{
                            sh """"""
                        }
                    }
                }
                stage("Clone Repo with Main Branch & Get Version") {
                    steps {
                        script{
                            // Clone the dev branch
                            git branch: "${env.BRANCH_NAME}",url: "${env.github_repo}"
                            // git branch: 'dev',credentialsId: 'github-token',url: "https://github.com/ammohan6212/front-end.git"

                            // Fetch all tags
                            sh 'git fetch --tags'

                            // Get the latest tag correctly
                            def version = sh(
                                script: "git describe --tags \$(git rev-list --tags --max-count=1)",
                                returnStdout: true
                            ).trim()
                            env.version = version
                            echo "VERSION=${env.VERSION}"
                        }
                    }
                }
                stage("Detect Programming Language") {
                    steps {
                        detectLanguage() // Calls vars/detectLanguage.groovy
                    }
                }
                stage("Static Code Analysis at Staging") {
                    steps {
                        runSonarQubeScan(env.SONAR_PROJECT_KEY)
                    }
                }
                stage("Unit Test Analysis at Staging") {
                    steps {
                        runUnitTests(env.DETECTED_LANG)
                    }
                }
                stage("Install Dependencies and Scan Dependencies at Staging") {
                    steps {
                        installAppDependencies(env.DETECTED_LANG)
                        performDependencyScan(env.DETECTED_LANG)
                    }
                }
                stage("Code Coverage at Staging") {
                    steps {
                        calculateCodeCoverage(env.DETECTED_LANG)
                    }
                }
                stage("Create Archiving File at Staging Env") {
                    steps {
                        createArchive("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", 'src/')
                    }
                }
                stage("Push Artifact to Storage at Staging") {
                    steps {
                        pushArtifact("${env.service_name}-${env.BRANCH_NAME}-${env.version}.zip", "s3://${env.AWS_S3_BUCKET}/${env.AWS_S3_PATH}")
                    }
                }
                stage("Perform Docker Image Build for preprod Env") {
                    steps {
                        buildDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", env.VERSION_TAG, '.')
                    }
                }
                stage("Docker Linting and Image Validation at Staging Env") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Trivy) at Staging Env") {
                    steps {
                        scanContainerTrivy("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Snyk) at Staging Env") {
                    steps {
                        scanContainerSnyk("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}", "Dockerfile")
                    }
                }
                stage("Perform Container Scanning (Docker Scout) at Staging Env") {
                    steps {
                        scanContainerDockerScout("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Grype) at Staging Env") {
                    steps {
                        scanContainerGrype("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Perform Container Scanning (Syft & Dockle) at Staging Env") {
                    steps {
                        scanContainerSyftDockle("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Final Docker Image Validation") {
                    steps {
                        validateDockerImage("${env.docker_username}/${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("send the notification to CAB team to verify the deployment"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("need the CAB approvals before deplyign to the production"){
                    steps{
                        script{
                            input message: "Do you approve deployment to Production?", ok: "Deploy Now", submitter: "manager,admin"
                        }
                    }
                }
                
                stage("Need the manual approval to deploy the application into prod"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("need approvals to next stage"){
                    steps{
                        script{
                            input message: "Do you approve deployment to Production?", ok: "Deploy Now", submitter: "manager,admin"
                        }
                    }
                }
                stage("Push Docker Image to stag Registry") {
                    steps {
                        pushDockerImageToRegistry("${env.docker_registr}", "${env.docker_credentials}", "${env. DOCKER_USERNAME}${env.service_name}-${env.BRANCH_NAME}:${env.version}")
                    }
                }
                stage("Deploy to prod at peak off -hours") {
                    steps {
                        withKubeConfig(
                            caCertificate: env.kubernetesCaCertificate, // Now dynamic
                            clusterName: env.kubernetesClusterName,     // Now dynamic
                            contextName: '',
                            credentialsId: env.kubernetesCredentialsId, // Now dynamic
                            namespace: "${env.BRANCH_NAME}",
                            restrictKubeConfigAccess: false,
                            serverUrl: env.kubernetes_endpoint
                        ){
                            // Change Kubernetes service selector to route traffic to Green
                            sh """kubectl apply -f blue-load.yml -n ${KUBE_NAMESPACE}"""
                        }
                    }
                }
                stage("Smoke Test in preProduction") {
                    steps {
                        performSmokeTesting(env.DETECTED_LANG)
                    }
                }
                stage("Sanity Test in preProduction") {
                    steps {
                        performSanityTesting(env.DETECTED_LANG)
                    }
                }
                stage("synthatic tests after prod  deployment"){
                    steps {
                        script {
                            sh """"""
                    }
                }
                }
                stage("monitoring the prod environment"){
                    steps {
                        script {
                            sh """"""
                        }
                    }
                }
                stage("if prod fails rollback to the previous verion"){
                    steps { 
                        script {
                            sh """"""
                        }
                    }
                }
                stage("Generate Version File preprod Env") {
                    steps {
                        generateVersionFile('gcp', "${env.bucket_name}", "${gcp_credid}")
                    }
                }
                stage("Need the manual approval to deploy the application into prod"){
                    steps{
                        sendEmailNotification('Alert', env.RECIPIENTS)
                    }
                }
                stage("need approvals to complete the deployment"){
                    steps{
                        script{
                            input message: "Do you approve deployment to Production?", ok: "Deploy Now", submitter: "manager,admin"
                        }
                    }
                }
                stage("prod deployment is successful"){
                    steps{
                        script{
                            echo "the production deplyment successful"
                        }
                    }
                }



            }

        }

    // Post-build actions for notification
    post {
        always {
            cleanWs() // Clean up workspace regardless of build status
        }
        success {
            sendEmailNotification('SUCCESS', env.RECIPIENTS)
        }
        unstable {
            sendEmailNotification('UNSTABLE', env.RECIPIENTS)
        }
        failure {
            sendEmailNotification('FAILURE', env.RECIPIENTS)
        }
        aborted {
            sendEmailNotification('ABORTED', env.RECIPIENTS)
        }
    }
}
=======
        stage("perform the container scanning using trivy"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    trivy image --format table frontend:${env.version}       # Table format
                    trivy image --format json frontend:${env.version}    # JSON format
                    trivy image --scanners secret --format json --output trivy-secrets.json frontend:${env.version} 
                    """
                }
            }
        }
        stage("perform the container scanning using snyk"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    snyk container test frontend:v1.0.0 --file=Dockerfile
                    snyk container test frontend:${env.version} 
                    snyk test --file=Dockerfile 
                    snyk test --docker your-image:tag
                    """
                }
            }
        }
        stage("perform the container scanning using dockerr scout "){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    docker scout quickview frontend:${env.version}   #
                    docker scout cves frontend:${env.version}
                    """
                }
            }

        }
        stage("perfomr the container scanning using the grype"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    grype frontend:${env.version}
                    grype frontend:${env.version} -o table
                    grype frontend:${env.version} -o json
                    """
                }
            }
        }
        stag("perform the container scannning using the syft and dockel"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    syft frontend:1.0
                    dockle frontend:${env.version}
                    """
                }
            }
        }

        stage("perform the integration with the docker containers"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    # 1. Start containers
                    docker-compose up -d

                    3 3. Stop and remove containers
                    docker-compose down
                    """
                }
            }
        }
        
        stage("Api contract testing"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    
                    """
                }
            }
        }
        stage("Build verification test or smoke test"){
            when {
                branch 'dev'
            }
            steps {
                script{
                     sh """
                     
                     """
                }
            }
        }
        stage("regressin testing"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("ui/componenet testing"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("static security analysis"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("chaos testing"){
            when{
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("push the docker image to the specified registry"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("perform the security scanning analysis"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """
                    """
                }
            }
        }
        stage("deploy to dev"){
            when {
                branch 'dev'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("Generate Version File dev env") {
            agent { label 'security-agent'}
            when {
                branch 'dev'
            }
            steps {
                script {
                    def version = sh(script: "git describe --tags \$(git rev-list --tags --max-count=1)", returnStdout: true).trim()
                    def commit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def branch = 'dev'
                    def date = sh(script: "date -u +'%Y-%m-%dT%H:%M:%SZ'", returnStdout: true).trim()

                    writeFile file: "version-dev${version}.txt", text: """
                        VERSION=${version}
                        BUILD_NUMBER=${env.BUILD_NUMBER}
                        BUILD_DATE=${date}
                        GIT_COMMIT=${commit}
                        GIT_BRANCH=${branch}
                        BUILD_BY=jenkins
                    """.stripIndent()

                    echo "Generated version.txt"
                    sh """
                    aws s3 cp version-dev${version}.txt s3://your-bucket-name/path/to/version.txt
                    """
            }
         }
        }
        stage("deploy to test"){
            when {
                branch 'test'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("Generate Version File dev env") {
            agent { label 'security-agent'}
            when {
                branch 'test'
            }
            steps {
                script {
                    def version = sh(script: "git describe --tags \$(git rev-list --tags --max-count=1)", returnStdout: true).trim()
                    def commit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def branch = 'test'
                    def date = sh(script: "date -u +'%Y-%m-%dT%H:%M:%SZ'", returnStdout: true).trim()

                    writeFile file: "version-test${version}.txt", text: """
                        VERSION=${version}
                        BUILD_NUMBER=${env.BUILD_NUMBER}
                        BUILD_DATE=${date}
                        GIT_COMMIT=${commit}
                        GIT_BRANCH=${branch}
                        BUILD_BY=jenkins
                    """.stripIndent()

                    echo "Generated version.txt"
                    sh """
                    aws s3 cp version-test${version}.txt s3://your-bucket-name/path/to/version.txt
                    """
            }
         }
        }
        stage("Approval Before  Deploying to stag") {
        when {
            branch 'stag' // or 'prod' depending on your naming
        }
        steps {
            script {
                input message: "Do you approve deployment to stag and send the artifact to the client?",
                    ok: "Deploy Now",
                    submitter: "manager,admin" // Optional: restrict who can approve
            }
        }
        }

        stage("deploy to QA"){
            when {
                branch 'stag'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("Generate Version File dev env") {
            agent { label 'security-agent'}
            when {
                branch 'stag'
            }
            steps {
                script {
                    def version = sh(script: "git describe --tags \$(git rev-list --tags --max-count=1)", returnStdout: true).trim()
                    def commit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def branch = 'stag'
                    def date = sh(script: "date -u +'%Y-%m-%dT%H:%M:%SZ'", returnStdout: true).trim()

                    writeFile file: "version-stag${version}.txt", text: """
                        VERSION=${version}
                        BUILD_NUMBER=${env.BUILD_NUMBER}
                        BUILD_DATE=${date}
                        GIT_COMMIT=${commit}
                        GIT_BRANCH=${branch}
                        BUILD_BY=jenkins
                    """.stripIndent()

                    echo "Generated version.txt"
                    sh """
                    aws s3 cp version-stag${version}.txt s3://your-bucket-name/path/to/version.txt
                    """
            }
         }
        }
        stage("Approval Before Production Deployment") {
        when {
            branch 'main' // or 'prod' depending on your naming
        }
        steps {
            script {
                input message: "Do you approve deployment to stag and send the artifact to the client?",
                    ok: "Deploy Now",
                    submitter: "manager,admin" // Optional: restrict who can approve
            }
        }
        }
        
        stage("deploy to main"){
            when{
                branch 'main'
            }
            steps{
                script{
                    sh """"""
                }
            }
        }
        stage("Generate Version File prod env") {
            agent { label 'security-agent'}
            when {
                branch 'main'
            }
            steps {
                script {
                    def version = sh(script: "git describe --tags \$(git rev-list --tags --max-count=1)", returnStdout: true).trim()
                    def commit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def branch = 'main'
                    def date = sh(script: "date -u +'%Y-%m-%dT%H:%M:%SZ'", returnStdout: true).trim()

                    writeFile file: "version-main${version}.txt", text: """
                        VERSION=${version}
                        BUILD_NUMBER=${env.BUILD_NUMBER}
                        BUILD_DATE=${date}
                        GIT_COMMIT=${commit}
                        GIT_BRANCH=${branch}
                        BUILD_BY=jenkins
                    """.stripIndent()

                    echo "Generated version.txt"
                    sh """
                    aws s3 cp version-main${version}.txt s3://your-bucket-name/path/to/version.txt
                    """
            }
         }
        }



}
}
>>>>>>> parent of e5b7f7a (pugh)
