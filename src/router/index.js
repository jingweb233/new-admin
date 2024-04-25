import Vue from 'vue'
import Router from 'vue-router'
// import myHome from '../components/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            redirect: '/login',
            hidden: true,
            component: resolve => require(['@/components/UserLogin.vue'], resolve)
        },
        {
            path: "/login",
            name: 'logon',
            hidden: true,
            component: resolve => require(['@/components/UserLogin.vue'], resolve)
        },
        {
            path: "*",
            name: 'ERROR404',
            hidden: true,
            // component: () => import('@/components/Home.vue')
            component: resolve => require(['@/components/NotFound.vue'], resolve)
        },
        // {
        //     path:"/home",
        //     // component: () => import('@/components/Home.vue')
        //     component: resolve =>require(['@/components/Home.vue'],resolve)
        // },

        {
            path: "/home",
            redirect: "/home/student",
            name: "学生管理",
            iconClass: "fa fa-users",
            // component: () => import('@/components/Home.vue')
            component: () => import('@/components/Home.vue'),
            children: [
                {
                    path: "/home/student",
                    name: "学生列表",
                    iconClass: "fa fa-list",
                    component: () => import('@/components/students/studentList.vue'),
                },
                {
                    path: "/home/info",
                    name: "学生信息",
                    iconClass: "fa fa-list",
                    component: () => import('@/components/students/infoList.vue'),
                },
                {
                    path: "/home/infos",
                    name: "信息管理",
                    iconClass: "fa fa-list",
                    component: () => import('@/components/students/infoListMana.vue'),
                },
                {
                    path: "/home/work",
                    name: "作业信息",
                    iconClass: "fa fa-list-ul",
                    component: () => import('@/components/students/workList.vue'),
                },
                {
                    path: "/home/works",
                    name: "作业管理",
                    iconClass: "fa fa-list",
                    component: () => import('@/components/students/workMana.vue'),
                },

            ]
        },
        {
            path: "/home",
            name: "数据分析",
            iconClass: "fa fa-bar-chart",
            // component: () => import('@/components/Home.vue')
            component: () => import('@/components/Home.vue'),
            children: [
                {
                    path: "/home/dataview",
                    name: "数据视图",
                    iconClass: "fa fa-line-chart",
                    component: () => import('@/components/dataAnalysis/dataView.vue'),
                },
                {
                    path: "/home/map",
                    name: "地图视图",
                    iconClass: "fa fa-line-chart",
                    component: () => import('@/components/dataAnalysis/mapView.vue'),
                },
                {
                    path: "/home/score",
                    name: "分数地图",
                    iconClass: "fa fa-line-chart",
                    component: () => import('@/components/dataAnalysis/scoreMap.vue'),
                },
                {
                    path: "/home/travel",
                    name: "旅游地图",
                    iconClass: "fa fa-line-chart",
                    component: () => import('@/components/dataAnalysis/travelMap.vue'),
                },
            ]
        },
        {
            path: "/users",
            name: "用户中心",
            iconClass: "fa fa-user",
            component: () => import('@/components/Home.vue'),
            children: [
                {
                    path: "/users/user",
                    name: "权限管理",
                    iconClass: "fa fa-user",
                    component: () => import('@/components/users/userMana.vue'),
                }
            ]
        }


    ],
    mode: 'history'
})