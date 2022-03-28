import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import LoginIndex from '../views/login/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/student/index.vue'),
    children: [
      {
        path: 'home',
        name: 'student_home',
        component: () => import('../views/student/home.vue')

      },
      {
        path: 'examination',
        name: 'student_examination',
        component: () => import('../views/student/examination.vue')

      },
      {
        path: 'questions',
        name: 'student_questions',
        component: () => import('../views/student/questions.vue')

      },
      {
        path: 'grade',
        name: 'student_grade',
        component: () => import('../views/student/grade.vue')

      }
    ]

  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/index.vue'),
    children: [
      {
        path: "grade/detail",
        component: () => import('../views/admin/grade/grade_detail.vue'),
        name: "admin_grade_detail"

      },
      {
        path: "grade",
        component: () => import('../views/admin/grade/grade.vue'),
        name: "admin_grade"

      },
      {
        path: 'home',
        component: () => import('../views/admin/home.vue'),
        name: 'admin_home'
      },
      {
        path: 'organization',
        component: () => import('../views/admin/organization/organization.vue'),
        name: 'admin_organization',
      },
      {
        path: 'examination',
        component: () => import('../views/admin/examination/examination.vue'),
        name: 'admin_examination'
      }, {
        path: 'examination/new',
        component: () => import('../views/admin/examination/NewExamination.vue'),
        name: 'admin_examination_new'
      },
      {
        path: 'organization/teacher',
        component: () => import('../views/admin/organization/organization_teacher.vue'),
        name: 'admin_organization_teacher'
      },
      {
        path: 'organization/student',
        component: () => import('../views/admin/organization/organization_student.vue'),
        name: 'admin_organization_student'
      },
      {
        path: 'organization/teacher/detail',
        component: () => import('../views/admin/organization/organization_teacher_detail.vue'),
        name: 'admin_organization_teacher_detail'
      },
      {
        path: 'mark/mark',
        component: () => import('../views/admin/mark/mark.vue'),
        name: 'admin_mark'
      },
      {
        path: 'mark/mark_console',
        component: () => import('../views/admin/mark/mark_console.vue'),
        name: 'admin_mark_console'
      }, {
        path: 'mark/mark_question',
        component: () => import('../views/admin/mark/mark_question'),
        name: 'admin_mark_question'
      },
      {
        path: 'log',
        component: () => import('../views/admin/log.vue'),
        name: 'admin_log'
      }

    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/teacher/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/teacher/home.vue')
      }, {
        path: 'mark/mark',
        component: () => import('../views/teacher/mark/mark.vue'),
        name: 'teacher_mark'
      },
      {
        path: 'mark/mark_console',
        component: () => import('../views/teacher/mark/mark_console.vue'),
        name: 'teacher_mark_console'
      }, {
        path: 'mark/mark_question',
        component: () => import('../views/teacher/mark/mark_question'),
        name: 'teacher_mark_question'
      }, {
        path: 'mark/mark_example',
        component: () => import('../views/teacher/mark/mark_example'),
        name: 'teacher_mark_example'
      }, {
        path: 'examination',
        component: () => import('../views/teacher/examination.vue'),
        name:'teacher_examination'
      }

    ]
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
