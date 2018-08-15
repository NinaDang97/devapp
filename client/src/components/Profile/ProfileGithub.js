import React, { Component } from 'react';
import { Divider, Segment, Grid, Label } from 'semantic-ui-react';

import { githubConfig } from '../../config/github';
// import axios from 'axios';

class ProfileGithub extends Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    // const { clientId, clientSecret, count, sort } = githubConfig;
    // const urlRequest = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`;
    const { count, sort } = githubConfig;
    const urlRequest = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`;

    fetch(urlRequest)
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log('ERROR FETCHING! ', err));

    // axios
    //   .get(urlRequest)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log('ERROR FETCHING Khanh! ', err));
  }

  render() {
    const reposDisplay = (
      <Segment color="black">
        <h3 style={Heading3}>Latest Github Repository</h3>
        <Divider />
        {this.state.repos.map((repo, i) => (
          <Segment key={i}>
            <Grid>
              <Grid.Column width={8}>
                <h4>
                  <a href={repo.html_url} target="_blank">
                    {repo.name}
                  </a>
                </h4>
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
                <Label.Group size="mini">
                  <Label as="a" color="blue">
                    Stars: {repo.stargazers_count}
                  </Label>
                  <Label as="a" color="grey">
                    Watchers: {repo.watchers_count}
                  </Label>
                  <Label as="a" color="green">
                    Forks: {repo.forks_count}
                  </Label>
                </Label.Group>
              </Grid.Column>
            </Grid>
            {repo.description ? <div>{repo.description}</div> : null}
          </Segment>
        ))}
      </Segment>
    );

    return <div ref="myRef">{reposDisplay}</div>;
  }
}

const Heading3 = {
  textAlign: 'center'
};

export default ProfileGithub;
