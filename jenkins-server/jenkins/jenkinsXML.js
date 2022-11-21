const getXML = () => {
  const buildShell = 'npm --registry https://registry.npm.taobao.org install npm run build';
  return `
  <project>
    <actions/>
    <description>front</description>
    <keepDependencies>false</keepDependencies>
    <properties/>
    <scm class="hudson.plugins.git.GitSCM" plugin="git@4.13.0">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>https://github.com/keno80/vite-uno-iconify.git</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/main</name>
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
        <command>${buildShell}</command>
        <configuredLocalRules/>
      </hudson.tasks.Shell>
    </builders>
    <publishers/>
    <buildWrappers>
      <jenkins.plugins.nodejs.NodeJSBuildWrapper plugin="nodejs@1.5.1">
        <nodeJSInstallationName>node_18.12.1</nodeJSInstallationName>
        <cacheLocationStrategy class="jenkins.plugins.nodejs.cache.DefaultCacheLocationLocator"/>
      </jenkins.plugins.nodejs.NodeJSBuildWrapper>
    </buildWrappers>
</project>`;
};

export default getXML();
