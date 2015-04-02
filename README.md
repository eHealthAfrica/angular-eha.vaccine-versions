# angular-eha.vaccine-versions

## Usage

Upgrades documents for the Vaccine trial to newer versions. Checks that the app can handle document version

```javascript
app.controller(function(ehaVaccineVersionsService, participant, $state) {
  try {
    $scope.participant = ehaVaccineVersionsService(participant);
  } catch(e) {
    // The converter will throw an error for unkown doc versions
    alert('This document is written by a newer version of the app, youll need to upgrade before you can edit it');
    $state.go('start');
  }
});
```

## Installation

Install with npm:

    npm install --save angular-eha.vaccine-versions

Or alternatively bower:

    bower install --save angular-eha.vaccine-versions

### Distribution bundle

- *dist/vaccine-versions.js*
- *dist/vaccine-versions.min.js*


Then simply add `eha.vaccine-versions` as dependencies somewhere in your project that makes sense and you're good to go.

#### A note on wiredep

If you're using wiredep `dist/vaccine-versions.js` will be injected by default. If you don't want that to happen you'll like want to employ something along the following lines in your `Gruntfile`:

```javascript
wiredep: {
 ...
  options: {
    exclude: [
      'bower_components/vaccine-versions/dist/vaccine-versions.js'
    ]
  }
  ...
}
```

Then you're free to include whichever bundle you prefer in what ever manner you prefer.

## Contributing

### Prerequisites

- Firefox (for running test suite)
- node (0.12.0)
- bower (1.3.12)
- grunt-cli (0.1.7)
- grunt (0.4.5)


### Installation

```bash
# Fork the upstream repo on github and pull down your fork
git clone git@github.com:yourusername/angular-eha.vaccine-versions.git
# change into project folder
cd angular-eha.vaccine-versions
# Add the upstream as a remote
git remote add upstream  git@github.com:eHealthAfrica/angular-eha.vaccine-versions.git
# Install the dev dependencies
npm install
```

### Docs

Code should be documented following the guidelines set out by [jsdoc](http://usejsdoc.org/) and [ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation). We can then leverage [Dgeni](http://github.com/angular/dgeni) or something simlary to generate documentation in any format we like.

### Test Suite

The test suite is configured to run in Firefox and is powered by:

- Karma
- Mocha
- Chai (as promised)
- Sinon (chai)

The library is conducive to TDD.  `grunt test:watch` is your friend. As modules (and templates) are exposed on their own namespace you can easily isolate areas of the code base for true unit testing without being forced to pull in the whole library or stub/mock modules irrelevant to the feature(s) you're testing.

#### Running Tests

##### Single run

```bash
grunt test
```

##### Watch

```bash
grunt test:watch
```

### Local Development

Local development is made easy, simply make use of either `npm link` or `bower link` to link the local component to your client application and then use `grunt watch` to continuously build the project.

## Release Process

To make a release, ensure you have issued `grunt build`, committed the distribution package and tagged the commit with an appropriate version according to the [SemVer spec](http://semver.org/).

To make this easy for you, there's a handy grunt task. Simply issue `grunt release:major|minor|patch` and grunt will take care of building, committing and tagging for you. Then make a PR to the master branch of the upstream, merge upon CI build success and then all that's left to do is to push the tags to the upstream.

e.g:

```bash
  grunt release:minor
  git pull-request -b <upstream_repo>:master
  git push upstream --tags
```

### Publishing to npm

To publish a new version to npm, simply issue from the command line prior making a release (i.e.issuing a `grunt release` and pushing both commits and tags to the upstream):

```
npm publish
```

### Publishing to bower

Publishing to bower is slightly simpler in so far that you only have to do it once, and not explicitly for every release like npm:

e.g.

```
bower register angular-eha.vaccine-versions <upstream_repo_url>
```
## License

Copyright 2015 Karl Westin <karl.westin@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.
