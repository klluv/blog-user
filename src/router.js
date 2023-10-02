  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use(VueRouter);

  import MainLayout from '@/Layout/MainLayout.vue';
  import MainHome from '@/page/home/MainHome.vue';
  import MainDetail from '@/page/detail/MainDetail.vue';
  import BlogList from "@/page/bloglist/AllBlog.vue";
  import BlogProfile from "@/page/navigation/profile/Profile.vue";
  import ProfileEdit from "@/page/navigation/profile/ProfileEdit.vue";
  import MyPage from "@/page/navigation/MyPage.vue";
  import BlogAdd from "@/page/navigation/crud/BlogAdd.vue";
  import BlogEdit from "@/page/navigation/crud/BlogEdit.vue";
  import Register from "@/page/login/Register.vue";
  import Login from "@/page/login/SignIn.vue"
  import ChangePassword from "@/page/navigation/profile/ChangePassword.vue"

  const routes = [
  {
  path:'/',
  component: MainLayout,
  children: [
    {
      path: '/blog',
      component: MainHome,
      name: 'MainHome',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blog/view:id',
      component: MainDetail,
      name: 'MainDetail',
      props: true,
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blog/list',
      component: BlogList,
      name: 'BlogList'
    },
    {
      path: '/blog/profile',
      component: BlogProfile,
      name: 'BlogProfile',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: 'blog/profile/edit',
      component: ProfileEdit,
      name: 'ProfileEdit',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: 'blog/profile/changepassword',
      component: ChangePassword,
      name: 'ChangePassword',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blog/mypage',
      component: MyPage,
      name: 'MyPage',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blog/mypage/add',
      component: BlogAdd,
      name: 'BlogAdd',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/blog/mypage/edit/:id',
      component: BlogEdit,
      name: 'BlogEdit',
      beforeEnter: (to, from, next) => {
        const token = Vue.$cookies.get("userToken");
        if(token) {
          next();
        } else {
          next({name: 'Login'})
        }
      }
    },
    {
      path: '/register',
      component: Register,
      name: 'Register'
    },
    {
      path: '/login',
      component: Login,
      name: "Login"
    }
  ]
 }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
