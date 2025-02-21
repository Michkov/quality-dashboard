package jira

import (
	jira "github.com/andygrunwald/go-jira"
	"github.com/redhat-appstudio/quality-studio/pkg/logger"
	"go.uber.org/zap"
)

func (t *clientFactory) GetIssueByJQLQuery(JQLQuery string) []jira.Issue {
	var issues []jira.Issue

	// append the jira issues to []jira.Issue
	appendFunc := func(i jira.Issue) (err error) {
		issues = append(issues, i)
		return err
	}

	// In this example, we'll search for all the issues with the provided JQL filter and Print the Story Points
	err := t.Client.Issue.SearchPages(JQLQuery, nil, appendFunc)
	if err != nil {
		logger, _ := logger.InitZap("info")
		logger.Error("Failed to search pages", zap.Error(err))
	}
	return issues
}
