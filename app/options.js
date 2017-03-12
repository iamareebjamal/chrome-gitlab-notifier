Vue.component('project', {
  props: {
    id: Number,
    avatar_url: String,
    project_url: String,
    path_with_namespace: String,
    archived: Boolean,
    events: Object,
    search_key: String
  },
  template: '\
    <tr v-show="match_search_key" class="project" v-bind:id="id" v-bind:data-avatar-url="avatar_url">\
      <td class="name">\
        <span v-if="archived" class="glyphicon glyphicon-eye-close"></span>\
        <img v-if="avatar_url" class="icon img-rounded" v-bind:src="avatar_url"/>\
        <img v-else class="icon img-rounded" src="img/gitlab_logo_128.png"/>\
        <a v-bind:href="project_url">{{path_with_namespace}}</a>\
      </td>\
      <td class="Commit">\
        <label class="checkbox-inline">\
          <input type="checkbox" v-model="events.Commit"/>\
          <i class="icon-upload-alt" title="Commit" />\
          Commit\
        </label>\
      </td>\
      <td class="Issue">\
        <label class="checkbox-inline">\
          <input type="checkbox" v-model="events.Issue"/>\
          <i class="icon-exclamation-sign" title="Issue" />\
          Issue\
        </label>\
      </td>\
      <td class="MergeRequest">\
        <label class="checkbox-inline">\
          <input type="checkbox" v-model="events.MergeRequest"/>\
          <i class="icon-check" title="MergeRequest" />\
          Commit\
        </label>\
      </td>\
      <td class="Milestone">\
        <label class="checkbox-inline">\
          <input type="checkbox" v-model="events.Milestone"/>\
          <i class="icon-calendar" title="Milestone" />\
          Commit\
        </label>\
      </td>\
      <td>\
        <a href="#" class="line-select-all" v-on:click="select_all">All</a>\
        &nbsp;/&nbsp;\
        <a href="#" class="line-select-none" v-on:click="select_none">None</a>\
      </td>\
    </tr>\
  ',
  computed: {
    match_search_key: function () {
      var keys = this.search_key.split(" ");
      for (var i = 0, l = keys.length; i < l; i++) {
        var r = new RegExp(keys[i], 'i');
        if (!this.path_with_namespace.match(r)) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    select_all: function (event) {
      this.select_events(true);
      event.preventDefault();
    },
    select_none: function (event) {
      this.select_events(false);
      event.preventDefault();
    },
    select_events: function (checked) {
      this.events.Commit = checked;
      this.events.Issue = checked;
      this.events.MergeRequest = checked;
      this.events.Milestone = checked;
    }
  }
});

new Vue({
  el: '#app',
  data: {
    // TODO: dummy
    gitlabPath: 'https://gitlab.com/',
    apiPath: "https://gitlab.com/api/v3/",
    privateToken: "xxxxxxxxx",
    pollingSecond: 10,
    maxEventCount: 100,
    maxNotificationCount: 10,
    newMarkMinute: 10,
    projects: [
      {
        id: 1, avatar_url: "https://gitlab.com/uploads/project/avatar/219579/image.jpg",
        project_url: "https://gitlab.com/sue445/example", path_with_namespace: "sue445/example", archived: false,
        events: {Commit: true, Issue: true, MergeRequest: true, Milestone: true}
      }
    ],
    search_key: ""
  }
});