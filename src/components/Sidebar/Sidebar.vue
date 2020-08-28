<template>
  <div class="sidebar-wrapper">
    <nav :class="{sidebar: true, sidebarStatic, sidebarOpened}">
      <header class="logo">
        <router-link to="/app">
          <span class="primary-word">GRA</span> App
        </router-link>
      </header>
      <ul class="nav">
        <NavLink
          :activeItem="activeItem"
          header="Dashboard"
          link="/app/dashboard"
          iconName="flaticon-home"
          index="dashboard"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="New Recruit"
          link="/app/new-applicant"
          iconName="flaticon-list"
          index="typography"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="View Recruits"
          link="/app/recruits"
          iconName="flaticon-equal-1"
          index="RecruitmentList"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="List of Letters"
          link="/app/letter"
          iconName="flaticon-network"
          index="lettersList"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Users"
          link="/app/users"
          iconName="flaticon-users"
          index="users"
          isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },

  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarStatic: (state) => state.sidebarStatic,
      sidebarOpened: (state) => !state.sidebarClose,
      activeItem: (state) => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
