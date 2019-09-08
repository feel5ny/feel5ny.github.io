(function (ns, $) {
  ns.LOADED_STYLES = ns.LOADED_STYLES || {};
  ns.loadStyle = function(url) {
    if (ns.LOADED_STYLES[url]) {
      return;
    }
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(link);
    ns.LOADED_STYLES[url] = true;
  };

  function $$(tag, classList) {
    var elem = document.createElement(tag);
    if (classList) {
      elem.className = classList.join(" ");
    }
    return elem;
  }

  var BASE = "https://github.com/";

  function getUserUrl(user) {
    return BASE + user;
  }

  function getRepoUrl(user, repo) {
    return BASE + user + "/" + repo;
  }

  function getCommitUrl(user, repo, commit) {
    return BASE + user + '/' + repo + '/commit/' + commit;
  }

  function makeLink(text, url, className) {
    className = className || "";
    return '<a href="' + url + '" target="_blank" class="' + className + '">' + text + '</a>';
  }

  function makeUserLink(user) {
    return makeLink(user, getUserUrl(user), 'user-link');
  }

  function makeRepoLink(user, repo) {
    return makeLink(repo, getRepoUrl(user, repo), 'repo-link');
  }

  function makeCommitLink(user, repo, commit) {
    return makeLink(commit, getCommitUrl(user, repo, commit), 'commit-link');
  }


  function makeHeader(user, repo) {
    var src = [
      '<div class="icon">',
      '  <span class="mega-octicon octicon-mark-github"></span>',
      '  <div class="avatar"><img /></div>',
      '</div>',
      // '<div class="number">',
      // '308',
      // '</div>',
      '<div class="content">',
      '  <h3 class="user">' + makeUserLink(user) + '</h3>',
      '  <h3 class="repo">' + makeRepoLink(user, repo) + '</h3>',
      '</div>',
      // '<div class="star">',
      // '  <span class="mega-octicon really-more-mega octicon-star"></span>',
      // '</div>'
    ].join("");
    return src;
  }

  function makeInfo(user, repo, commit) {
    var src = [
      '<div class="icon">',
      '  <div class="circle"></div>',
      '  <span class="octicon octicon-git-commit"></span>',
      '</div>',
      '<div class="status">',
      makeCommitLink(user, repo, commit),
      '  <span></span>',
      '</div>'
    ].join("");
    return src;
  }

  function makeItem(icon, className, text, active) {
    var src = [
      '<div class="item ' + className + '">',
      '  <div class="icon">',
      '    <div class="circle' + (active ? ' active' : '') + '"></div>',
      '    <span class="' + icon + '"></span>',
      '  </div>',
      '  <div class="text' + (active ? ' active' : '') + '">' + text + '</div>',
      '</div>',
    ].join("");
    return src;
  }

  function makeCommits(user, repo, commit) {
    var src = [
      '<div class="line">',
      '</div>',
      '<div class="entry">',
      makeItem('octicon octicon-code', "commit-before", '<span class="commits-count-before">N/A</span> commits'),
      makeItem('octicon octicon-pencil', "commit-current", makeCommitLink(user, repo, commit) + ', referenced in this article', true),
      makeItem('octicon octicon-code', "commit-after", '<span class="commits-count-after">N/A</span> commits'),
      makeItem('octicon octicon-clock', "commit-latest", makeCommitLink(user, repo, "N/A") + ', latest'),
      makeItem('octicon octicon-check', "commit-up-to-date", 'Up-to-date'),
      '</div>'
    ].join("");
    return src;
  }

  function ajax(url, etag, cb) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    if (etag) {
      // console.log("Request with ETag: " + etag);
      request.setRequestHeader('If-None-Match', etag);
    }

    request.onload = function() {
      var newEtag = request.getResponseHeader('ETag');
      // console.log(newEtag);
      console.log("Rate limit remaing: " + request.getResponseHeader('X-RateLimit-Remaining'));
      if (request.status == 304) {
        // No error, no data == remote not updated
        cb(newEtag, null, null);
      }
      else if (request.status >= 200 && request.status < 400) {
        // Success!
        // No error, has data
        var data = JSON.parse(request.responseText);
        cb(newEtag, null, data);
      } else {
        // We reached our target server, but it returned an error
        var data = JSON.parse(request.responseText);
        console.error(data.message);
        var e = new Error(data.message);
        e.raw = data;
        cb(newEtag, e);
      }
    };


    request.onerror = function(e) {
      // There was a connection error of some sort
      console.error(e);
      cb(etag, e);
    };

    request.send();
  }

  function cachedAjax(url, cb) {
    var cache = JSON.parse(localStorage.getItem(url)) || {data: null, etag: null};
    // console.log(cache);
    // BUG: commits after latest 100 will not be found, need to traverse pages
    ajax(url + "?per_page=100", cache.etag, function(next, err, data) {
      if (err) {
        console.log("Something wrong, use cached data");
        return cb(err, cache.data);
      }
      if (data) {
        console.log("Update cache");
        localStorage.setItem(url, JSON.stringify({data: data, etag: next}))
        return cb(null, data);
      }
      console.log("Cache hit");
      localStorage.setItem(url, JSON.stringify({data: cache.data, etag: next}))
      return cb(null, cache.data);
    });
  }

  function Badge(sel, user, repo, commit, autoExpand) {
    this.container = $(sel);
    this.user = user;
    this.repo = repo;
    this.commit = commit;
    this.autoExpand = autoExpand ? true : false;
    this.el = $$('div', ['github-badge']);
    this.info = $$('div', ['info']);
    this.header = $$('div', ['header']);
    this.commits = $$('div', ['commits', 'fold']);


    this.header.innerHTML = makeHeader(user, repo);
    this.info.innerHTML = makeInfo(user, repo, commit);
    this.commits.innerHTML = makeCommits(user, repo, commit);

    this.header.avatarContainer = this.header.querySelector(".avatar");
    this.header.avatar = this.header.querySelector(".avatar>img");
    this.header.logo = this.header.querySelector(".icon>span");
    this.header.user = this.header.querySelector(".user");

    this.info.commitLink = this.info.querySelector(".status>a");
    this.info.statusText = this.info.querySelector(".status>span");
    this.info.icon = this.info.querySelector(".icon>span");

    this.header.user.addEventListener('mouseover', this.toggleAvatar.bind(this));
    this.header.user.addEventListener('mouseout', this.toggleAvatar.bind(this));
    this.info.addEventListener('click', this.toggleFold.bind(this));

    var commitLinks = this.commits.querySelectorAll(".commit-link");
    this.commits.beforeCounter = this.commits.querySelector(".commits-count-before");
    this.commits.afterCounter = this.commits.querySelector(".commits-count-after");
    this.commits.currentCommitLink = commitLinks[0];
    this.commits.latestCommitLink = commitLinks[1];
    this.commits.afterEntry = this.commits.querySelector(".commit-after");
    this.commits.latestCommitEntry = this.commits.querySelector(".commit-latest");
    this.commits.upToDateEntry = this.commits.querySelector(".commit-up-to-date");

    this.el.appendChild(this.header);
    this.el.appendChild(this.info);
    this.el.appendChild(this.commits);

    this.container.appendChild(this.el);
    this.update();
  }
  Badge.prototype.updateCommitLink = function(link, commit) {
    link.title = commit.commit.message;
    link.innerHTML = commit.sha.substr(0, 6);
    link.href = getCommitUrl(this.user, this.repo, commit.sha);
  }

  Badge.prototype.updateCommits = function(commits) {
      var current, currentCommit;
      for (var i = 0; i < commits.length; i++) {
        var commit = commits[i];
        if (commit.sha.indexOf(this.commit) == 0) {
          current = i;
          currentCommit = commit;
        }
      }
      var lastCommit = commits[0];
      var delta = current;//commits.length - current - 1;
      var finalIcon = "octicon-history";
      this.info.statusText.innerHTML = delta > 0 ? ", " + delta + " commits behind" : ", up-to-date";

      this.commits.afterEntry.style.display = 'none';
      this.commits.latestCommitEntry.style.display = 'none';
      this.commits.upToDateEntry.style.display = 'none';


      if (delta == 0) {
        this.commits.upToDateEntry.style.display = 'block';
        finalIcon = "octicon-check";
      } else if (delta == 1) {
        this.commits.latestCommitEntry.style.display = 'block';
      } else {
        this.commits.afterEntry.style.display = 'block';
        this.commits.latestCommitEntry.style.display = 'block';
      }

      this.commits.beforeCounter.innerHTML = commits.length - current - 1;
      this.commits.afterCounter.innerHTML = delta - 1;

      this.updateCommitLink(this.info.commitLink, currentCommit);
      this.updateCommitLink(this.commits.currentCommitLink, currentCommit);
      this.updateCommitLink(this.commits.latestCommitLink, lastCommit);

      this.toggleSyncAnimation(finalIcon);

      if (this.autoExpand && this.commits.className !== "commits") {
        this.toggleFold();
      }
  }

  Badge.prototype.toggleAvatar = function() {
    var className = this.header.avatarContainer.className;
    this.header.avatarContainer.className = className === "avatar" ? "avatar show" : "avatar";
    this.header.logo.className = className === "avatar" ? "mega-octicon octicon-mark-github back" : "mega-octicon octicon-mark-github";
  }

  Badge.prototype.toggleFold = function() {
    this.commits.className = this.commits.className === "commits" ? "commits fold" : "commits";
  }

  Badge.prototype.toggleSyncAnimation = function(finalIcon) {
    finalIcon = finalIcon || "octicon-git-commit";
    var current = this.info.icon.className;
    this.info.icon.className = current === "octicon octicon-sync spinner" ? ("octicon " + finalIcon) : "octicon octicon-sync spinner";
  }

  var API_BASE = "https://api.github.com"
  Badge.prototype.update = function() {
    var userUrl = API_BASE + "/users/" + this.user;
    var repoUrl = API_BASE + "/repos/" + this.user + "/" + this.repo;
    var commitsUrl = repoUrl + "/commits";

    this.toggleSyncAnimation();
    var that = this;
    cachedAjax(userUrl, function(err, data) {
      // console.log(data);
      that.header.avatar.src = data.avatar_url;
    });
    cachedAjax(commitsUrl, function(err, data) {
      // console.log(data);
      if (err && !data) {
        that.info.statusText.innerHTML = ", something is wrong";
        that.toggleSyncAnimation('octicon-x');
      } else {
        that.updateCommits(data);
      }
    })
  }

  ns.Badge = Badge;

})(window, document.querySelector.bind(document));
