import { githubApi } from './api';

export const READ_CONTRIBUTORS = 'READ_CONTRIBUTORS';
export const READ_ISSUES = 'READ_ISSUES';
export const READ_LANGUAGES = 'READ_LANGUAGES'

export function readContributors() {
  const request = githubApi.get(`/contributors`);
  return {
    type: READ_CONTRIBUTORS,
    payload: request
  }
}

export function readIssues(query) {
  const request = githubApi.get(`/issues`, query)
    .then((response) => {
      if(!response.ok) response.data = [];
      return response;
    });
  return {
    type: READ_ISSUES,
    payload: request
  }
}

export function readLanguages() {
  const request = githubApi.get(`/languages`);
  return {
    type: READ_LANGUAGES,
    payload: request
  }
}
