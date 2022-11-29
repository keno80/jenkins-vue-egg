const getXML = config => {
  const xml = `
  <project>
    <actions/>
    <description>${config.projectName}</description>
    <keepDependencies>false</keepDependencies>
    <properties/>
    <scm class="hudson.plugins.git.GitSCM" plugin="git@4.13.0">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>${config.gitUrl}</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/${config.gitBranch}</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
      <submoduleCfg class="empty-list"/>
      <extensions/>
    </scm>
    <canRoam>true</canRoam>
    <disabled>false</disabled>
    <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
    <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
    <triggers/>
    <concurrentBuild>false</concurrentBuild>
    <builders>
      <hudson.tasks.Shell>
        <command>npm --registry https://registry.npm.taobao.org install npm run build</command>
        <configuredLocalRules/>
      </hudson.tasks.Shell>
    </builders>
    <publishers>
      <hudson.plugins.ws__cleanup.WsCleanup plugin="ws-cleanup@0.43">
        <patterns class="empty-list"/>
        <deleteDirs>false</deleteDirs>
        <skipWhenFailed>false</skipWhenFailed>
        <cleanWhenSuccess>true</cleanWhenSuccess>
        <cleanWhenUnstable>true</cleanWhenUnstable>
        <cleanWhenFailure>true</cleanWhenFailure>
        <cleanWhenNotBuilt>true</cleanWhenNotBuilt>
        <cleanWhenAborted>true</cleanWhenAborted>
        <notFailBuild>false</notFailBuild>
        <cleanupMatrixParent>false</cleanupMatrixParent>
        <externalDelete/>
        <disableDeferredWipeout>false</disableDeferredWipeout>
      </hudson.plugins.ws__cleanup.WsCleanup>
    </publishers>
    <buildWrappers>
      <jenkins.plugins.nodejs.NodeJSBuildWrapper plugin="nodejs@1.5.1">
        <nodeJSInstallationName>node_18.12.1</nodeJSInstallationName>
        <cacheLocationStrategy class="jenkins.plugins.nodejs.cache.DefaultCacheLocationLocator"/>
      </jenkins.plugins.nodejs.NodeJSBuildWrapper>
    </buildWrappers>
  </project>`;

  return xml;
};

module.exports = getXML;
