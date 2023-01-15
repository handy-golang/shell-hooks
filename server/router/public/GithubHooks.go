package public

import (
	"os/exec"
	"strings"
	"time"

	"ShellHooks.net/server/global"
	"ShellHooks.net/server/global/config/public"
	"ShellHooks.net/server/router/result"
	"github.com/EasyGolang/goTools/mFiber"
	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
)

type GithubHooksType struct {
	Deleted bool   `json:"deleted"`
	After   string `json:"after"`
	Pusher  struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	} `json:"pusher"`
	Created bool `json:"created"`
	Commits []struct {
		ID        string        `json:"id"`
		Timestamp time.Time     `json:"timestamp"`
		Modified  []interface{} `json:"modified"`
		URL       string        `json:"url"`
		Author    struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Username string `json:"username"`
		} `json:"author"`
		Committer struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Username string `json:"username"`
		} `json:"committer"`
		Added    []string      `json:"added"`
		Removed  []interface{} `json:"removed"`
		TreeID   string        `json:"tree_id"`
		Distinct bool          `json:"distinct"`
		Message  string        `json:"message"`
	} `json:"commits"`
	HeadCommit struct {
		Author struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Username string `json:"username"`
		} `json:"author"`
		Modified  []interface{} `json:"modified"`
		URL       string        `json:"url"`
		Committer struct {
			Name     string `json:"name"`
			Email    string `json:"email"`
			Username string `json:"username"`
		} `json:"committer"`
		Added     []string      `json:"added"`
		ID        string        `json:"id"`
		TreeID    string        `json:"tree_id"`
		Distinct  bool          `json:"distinct"`
		Message   string        `json:"message"`
		Timestamp time.Time     `json:"timestamp"`
		Removed   []interface{} `json:"removed"`
	} `json:"head_commit"`
	Before  string      `json:"before"`
	BaseRef interface{} `json:"base_ref"`
	Sender  struct {
		GistsURL          string `json:"gists_url"`
		ReposURL          string `json:"repos_url"`
		ReceivedEventsURL string `json:"received_events_url"`
		HTMLURL           string `json:"html_url"`
		Type              string `json:"type"`
		SiteAdmin         bool   `json:"site_admin"`
		EventsURL         string `json:"events_url"`
		ID                int    `json:"id"`
		AvatarURL         string `json:"avatar_url"`
		URL               string `json:"url"`
		StarredURL        string `json:"starred_url"`
		Login             string `json:"login"`
		GravatarID        string `json:"gravatar_id"`
		FollowersURL      string `json:"followers_url"`
		FollowingURL      string `json:"following_url"`
		SubscriptionsURL  string `json:"subscriptions_url"`
		OrganizationsURL  string `json:"organizations_url"`
		NodeID            string `json:"node_id"`
	} `json:"sender"`
	Ref        string `json:"ref"`
	Forced     bool   `json:"forced"`
	Compare    string `json:"compare"`
	Repository struct {
		ContentsURL              string        `json:"contents_url"`
		Size                     int           `json:"size"`
		Watchers                 int           `json:"watchers"`
		Name                     string        `json:"name"`
		FullName                 string        `json:"full_name"`
		MilestonesURL            string        `json:"milestones_url"`
		License                  interface{}   `json:"license"`
		Stargazers               int           `json:"stargazers"`
		StatusesURL              string        `json:"statuses_url"`
		CommitsURL               string        `json:"commits_url"`
		Homepage                 string        `json:"homepage"`
		MasterBranch             string        `json:"master_branch"`
		SubscribersURL           string        `json:"subscribers_url"`
		HasPages                 bool          `json:"has_pages"`
		CollaboratorsURL         string        `json:"collaborators_url"`
		GitRefsURL               string        `json:"git_refs_url"`
		TreesURL                 string        `json:"trees_url"`
		CommentsURL              string        `json:"comments_url"`
		NodeID                   string        `json:"node_id"`
		GitTagsURL               string        `json:"git_tags_url"`
		DeploymentsURL           string        `json:"deployments_url"`
		StargazersCount          int           `json:"stargazers_count"`
		WatchersCount            int           `json:"watchers_count"`
		HasDownloads             bool          `json:"has_downloads"`
		HasWiki                  bool          `json:"has_wiki"`
		TeamsURL                 string        `json:"teams_url"`
		LanguagesURL             string        `json:"languages_url"`
		GitCommitsURL            string        `json:"git_commits_url"`
		Visibility               string        `json:"visibility"`
		ID                       int           `json:"id"`
		DownloadsURL             string        `json:"downloads_url"`
		IssuesURL                string        `json:"issues_url"`
		Language                 string        `json:"language"`
		OpenIssues               int           `json:"open_issues"`
		URL                      string        `json:"url"`
		CompareURL               string        `json:"compare_url"`
		GitURL                   string        `json:"git_url"`
		CloneURL                 string        `json:"clone_url"`
		ForksCount               int           `json:"forks_count"`
		MirrorURL                interface{}   `json:"mirror_url"`
		StargazersURL            string        `json:"stargazers_url"`
		IssueCommentURL          string        `json:"issue_comment_url"`
		ArchiveURL               string        `json:"archive_url"`
		CreatedAt                int           `json:"created_at"`
		SvnURL                   string        `json:"svn_url"`
		Private                  bool          `json:"private"`
		ForksURL                 string        `json:"forks_url"`
		ContributorsURL          string        `json:"contributors_url"`
		Disabled                 bool          `json:"disabled"`
		OpenIssuesCount          int           `json:"open_issues_count"`
		IsTemplate               bool          `json:"is_template"`
		WebCommitSignoffRequired bool          `json:"web_commit_signoff_required"`
		Topics                   []interface{} `json:"topics"`
		HTMLURL                  string        `json:"html_url"`
		HooksURL                 string        `json:"hooks_url"`
		IssueEventsURL           string        `json:"issue_events_url"`
		AssigneesURL             string        `json:"assignees_url"`
		BlobsURL                 string        `json:"blobs_url"`
		SSHURL                   string        `json:"ssh_url"`
		HasProjects              bool          `json:"has_projects"`
		Fork                     bool          `json:"fork"`
		KeysURL                  string        `json:"keys_url"`
		MergesURL                string        `json:"merges_url"`
		LabelsURL                string        `json:"labels_url"`
		UpdatedAt                time.Time     `json:"updated_at"`
		HasIssues                bool          `json:"has_issues"`
		AllowForking             bool          `json:"allow_forking"`
		Forks                    int           `json:"forks"`
		TagsURL                  string        `json:"tags_url"`
		ReleasesURL              string        `json:"releases_url"`
		PushedAt                 int           `json:"pushed_at"`
		HasDiscussions           bool          `json:"has_discussions"`
		Archived                 bool          `json:"archived"`
		DefaultBranch            string        `json:"default_branch"`
		Owner                    struct {
			Login             string `json:"login"`
			FollowingURL      string `json:"following_url"`
			OrganizationsURL  string `json:"organizations_url"`
			EventsURL         string `json:"events_url"`
			StarredURL        string `json:"starred_url"`
			SubscriptionsURL  string `json:"subscriptions_url"`
			NodeID            string `json:"node_id"`
			AvatarURL         string `json:"avatar_url"`
			GravatarID        string `json:"gravatar_id"`
			FollowersURL      string `json:"followers_url"`
			ReceivedEventsURL string `json:"received_events_url"`
			SiteAdmin         bool   `json:"site_admin"`
			Name              string `json:"name"`
			Email             string `json:"email"`
			ID                int    `json:"id"`
			URL               string `json:"url"`
			HTMLURL           string `json:"html_url"`
			GistsURL          string `json:"gists_url"`
			ReposURL          string `json:"repos_url"`
			Type              string `json:"type"`
		} `json:"owner"`
		Description      string `json:"description"`
		EventsURL        string `json:"events_url"`
		BranchesURL      string `json:"branches_url"`
		SubscriptionURL  string `json:"subscription_url"`
		PullsURL         string `json:"pulls_url"`
		NotificationsURL string `json:"notifications_url"`
	} `json:"repository"`
}

func GithubHooks(c *fiber.Ctx) error {
	var json GithubHooksType
	mFiber.Parser(c, &json)

	if len(json.Repository.Name) < 2 {
		return c.JSON(result.Fail.WithData(json))
	}

	ShellPath := GetShellContent(json.Repository.Name)

	isShellPath := mPath.Exists(ShellPath)

	if !isShellPath {
		global.LogErr("public.GithubHooks 脚本未找到", json.Repository.Name, ShellPath)
		return c.JSON(result.Fail.WithData("脚本未找到"))
	}

	// 执行 start.sh 文件
	Succeed, err := exec.Command("/bin/bash", ShellPath).Output()
	if err != nil {
		global.LogErr("public.GithubHooks 脚本执行错误", mStr.ToStr(err))
		return c.JSON(result.Fail.WithData(mStr.ToStr(err)))
	} else {
		global.Log.Println("public.GithubHooks 部署", json.Repository.Name, ShellPath, Succeed)
		return c.JSON(result.OK.WithData(mStr.ToStr(Succeed)))
	}
}

func GetShellContent(name string) string {
	ShellPath := ""
	for i := 0; i < len(public.ShellFiles); i++ {
		item := public.ShellFiles[i]
		find := strings.Contains(item.Name, name)
		if find {
			ShellPath = item.Path
			break
		}
	}

	return ShellPath
}
