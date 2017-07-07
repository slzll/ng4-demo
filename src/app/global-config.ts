import { API } from './api';
export const GlobalConfig = {
    // 分页配置
    paginationConf: {
        currentPage: 1, // 当前页
        totalItems: 0, // 数据总数
        itemsPerPage: 12, // 每页显示的条数
        pagesLength: 6,
        perPageOptions: [10, 20, 30, 40, 50],
        totalPages: 0 // 总页数
    },
    // 所有接口
    ALL_PORT: {
        // 判断能否访问页面接口
        Authorization: {
            url: API.API_URL + "/Page/Authorization",
            data: {}
        },
        // 保持在线
        KeepOnline: {
            url: API.API_URL + "/Page/KeepOnline"
        },
        // 文章分类
        ArticleCategory: {
            url: API.API_URL + "/Page/ArticleCategory",
            data: { titleNav: '文章分类', sort: 'Sort', order: 'desc' }
        },
        // 新闻
        ArticleList: {
            url: API.API_URL + "/Page/ArticleList",
            data: { sort: 'Sort', order: 'desc', wordLimt: '20' }
        },
        // 新闻内容
        ArticleContent: {
            url: API.API_URL + "/Page/ArticleContent",
            data: {}
        },
        // 轮播新闻
        ArticleCarousel: {
            url: API.API_URL + "/Page/ArticleCarousel",
            data: { page: 1, rows: 5, sort: 'Id', order: 'desc', ids: '32', wordLimt: 28, img: true }
        },
        // 通知公告
        noticeAnnouncement: {
            url: API.API_URL + "/Page/LeftNotice",
            data: { page: '1', rows: '4', sort: 'Sort', order: 'desc', wordLimt: '15' }
        },
        // 通知通告分页
        NoticeList: {
            url: API.API_URL + "/Page/NoticeList",
            data: { page: '1', rows: '9', sort: 'Sort', order: 'desc', titleNav: '通告列表', wordLimt: '35' }
        },

        // 通知内容
        noticeContent: {
            url: API.API_URL + "/Page/NoticeContent",
            data: { Id: '', titleNav: '通知内容' }
        },
        // 友情链接
        Blogroll: {
            url: API.API_URL + "/Page/Blogroll",
            data: {}
        },
        // 培训课程
        TrainingClass: {
            url: API.API_URL + "/Page/TrainingClass",
            data: { sort: 'Id', order: 'desc' }
        },
        // 请求用户信息
        LoginShort: {
            url: API.API_URL + "/Page/LoginShort",
            data: {}
        },
        // 防伪造请求
        AntiForgeryToken: {
            url: API.API_URL + "/Page/AntiForgeryToken",
            data: {}
        },
        // 用户退出
        LoginOut: {
            url: API.API_URL + "/Page/LoginOut",
            data: {}
        },
        // 踢出其他地方登录账号
        KickOut: {
            url: API.API_URL + "/Page/KickOut",
            data: {}
        },
        // 点击登陆（没有记住密码）
        LoginMe: {
            url: API.API_URL + "/Page/LoginMe",
            data: {}
        },
        // 点击登陆（记住密码）
        LoginCode: {
            url: API.API_URL + "/Page/LoginCode",
            data: {}
        },
        // 记住密码
        GetLoginName: {
            url: API.API_URL + "/Page/GetLoginName",
            data: {}
        },
        // 单位排行
        LeftGroupRank: {
            url: API.API_URL + "/Page/LeftGroupRank",
            data: { page: 1, rows: 10, sort: "AvgCredit", order: "desc", titleNav: '单位排行', wordLimt: 9 }
        },
        // 单位排行
        RankGroupList: {
            url: API.API_URL + "/Page/RankGroupList",
            data: { page: 1, rows: 15, sort: "AvgCredit", order: "desc", titleNav: '单位排行', wordLimt: 9 }
        },
        // 实时数据
        LeftRealTimeData: {
            url: API.API_URL + "/Page/LeftRealTimeData",
            data: {}
        },
        // 课程分类
        CourseCategory: {
            url: API.API_URL + "/Page/CourseCategory",
            data: { titleNav: "课程分类", sort: 'Sort', order: 'Desc', title: '' }
        },
        GetCourseList: {
            url: API.API_URL + "/Page/GetCourseList",
            data: { channelIds: "112" }
        },
        // 课程列表
        CourseList: {
            url: API.API_URL + "/Page/CourseList",
            data: {}
        },
        // 课程点击排行
        CourseClickRank: {
            url: API.API_URL + "/Page/CourseClickRank",
            data: { page: 1, rows: 10, sort: 'ClickCount', order: 'desc', courseType: 'All', flag: 'All', titleNav: '课程排行', wordLimt: 35 }
        },
        // 课程点击排行
        CourseClickList: {
            url: API.API_URL + "/Page/CourseClickList",
            data: { page: 1, rows: 15, sort: 'ClickCount', order: 'desc', titleNav: '课程排行', wordLimt: 17 }
        },
        // 批量选课
        AddStudyCourse: {
            url: API.API_URL + "/Page/AddStudyCourse",
            data: { checkValue: '' }
        },
        // 个人中心个人信息
        LoginLong: {
            url: API.API_URL + "/Page/LoginLong",
            data: {}
        },
        // 学员学时排行
        LeftUserRank: {
            url: API.API_URL + "/Page/LeftUserRank",
            data: { page: 1, rows: 10, sort: 'TotalCredit', order: 'desc', titleNav: "学员学时排行", wordLimt: 6 }
        },
        // 学员排行
        RankUserList: {
            url: API.API_URL + "/Page/RankUserList",
            data: { page: 1, rows: 15, sort: 'TotalCredit', order: 'desc', titleNav: "学员排行" }
        },
        // 个人中心课程
        MyCenter: {
            url: API.API_URL + "/Page/MyCenter",
            data: { page: 1, rows: 10, sort: 'BrowseScore', order: 'desc', titleNav: "个人中心", courseType: "Unfinish", title: "" }
        },
        // 考试中心列表
        ExamList: {
            url: API.API_URL + "/Page/ExamList",
            data: { page: 1, rows: 5, sort: 'Id', order: 'desc', titleNav: "考试中心", examType: "All", title: "" }
        },
        // 专题培训班分类
        GetTrainingClassTypeList: {
            url: API.API_URL + "/Page/GetTrainingClassTypeList",
            data: { titleNav: "培训班分类", sort: 'Sort', order: 'Desc' }
        },
        // 我的班级
        ClassMy: {
            url: API.API_URL + "/Page/ClassMy",
            data: { page: 1, rows: 7, sort: 'Id', order: 'desc', titleNav: "我的班级", title: "" }
        },
        // 获取培训列表
        GetClassList: {
            url: API.API_URL + "/Page/GetClassList",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', title: "", type: "just", categoryId: 0 }
        },
        // 课程详情
        CourseContent: {
            url: API.API_URL + "/Page/CourseContent",
            data: { Id: '', titleNav: '课程详情' }
        },
        // 学习统计
        MyStudyStat: {
            url: API.API_URL + "/Page/MyStudyStat",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '学习统计' }
        },
        // 考试统计
        MyExamStat: {
            url: API.API_URL + "/Page/MyExamStat",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '考试统计' }
        },
        // 我的收藏
        MyFavorite: {
            url: API.API_URL + "/Page/MyFavorite",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '我的收藏' }
        },
        // 收藏
        FavoriteAdd: {
            url: API.API_URL + "/Page/FavoriteAdd",
            data: { mainId: '', type: '', title: '', remark: '' }
        },
        // 取消收藏
        FavoriteDelete: {
            url: API.API_URL + "/Page/FavoriteDelete",
            data: { id: '' }
        },
        // 学习计划
        MyStudyPlan: {
            url: API.API_URL + "/Page/MyStudyPlan",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '学习计划' }
        },
        // 获取笔记
        NoteAdd: {
            url: API.API_URL + "/Home/NoteAdd",
            data: { courseId: '' }
        },
        // 添加笔记
        AddNote: {
            url: API.API_URL + "/Page/AddNote",
            data: { Name: '', Content: '', CourseId: '' }
        },
        // 笔记列表
        CourseNoteList: {
            url: API.API_URL + "/Page/CourseNoteList",
            data: { CourseId: '' }
        },
        // 编辑笔记
        NoteUpdate: {
            url: API.API_URL + "/Page/NoteUpdate",
            data: {}
        },
        // 删除笔记
        DelNote: {
            url: API.API_URL + "/Page/DelNote",
            data: { Id: '' }
        },

        // 添加计划
        StudyPlanAdd: {
            url: API.API_URL + "/Home/StudyPlanAdd",
            data: { courseId: '' }
        },
        // 添加计划提交
        AddStudyPlan: {
            url: API.API_URL + "/Page/StudyPlanAdd",
            data: { PlanFinishDate: '', RemindDate: '', RemindCycle: '', Remark: '', CourseId: '' }
        },
        // 查看计划
        StudyPlanUpdate: {
            url: API.API_URL + "/Home/StudyPlanUpdate",
            data: { courseId: '' }
        },
        // 提交修改计划
        EditStudyPlanUpdate: {
            url: API.API_URL + "/Page/StudyPlanUpdate",
            data: { PlanFinishDate: '', RemindDate: '', RemindCycle: '', Remark: '', CourseId: '', Id: '' }
        },
        // 删除课程
        DelUserCourseReg: {
            url: API.API_URL + "/Page/DelUserCourseReg",
            data: { courseId: '' }
        },
        // 考试查看
        CourseExamList: {
            url: API.API_URL + "/Page/CourseExamList",
            data: { courseId: '' }
        },
        // 删除学习计划
        DelStudyPlan: {
            url: API.API_URL + "/Page/DelStudyPlan",
            data: { id: '' }
        },
        // 留言板
        MessageList: {
            url: API.API_URL + "/Page/MessageList",
            data: { page: 1, rows: 13, sort: 'CreateDate', order: 'desc', titleNav: '留言板', wordLimt: '35' }
        },
        // 留言信息详情
        MessageDetail: {
            url: API.API_URL + "/Page/MessageDetail",
            data: { id: '', titleNav: '留言详情' }
        },
        // 提交添加留言
        GetMessageAdd: {
            url: API.API_URL + "/Page/GetMessageAdd",
            data: { Name: '', Class: '', Content: '' }
        },
        // 考试题
        Exam: {
            url: API.API_URL + "/Exam/Exam",
            data: { parameter1: '' }
        },
        // 个人学习档案
        StudyStatistics: {
            url: API.API_URL + "/Page/StudyStatistics",
            data: { page: 1, rows: 5, sort: 'Id', order: 'desc', type: '', startDate: '', endDate: '', wordLimt: 24, titleNav: '个人学习档案' }
        },
        // 考试详情
        ExamDetailListItem: {
            url: API.API_URL + "/Exam/ExamDetailListItem",
            data: { page: 1, rows: 10, sort: 'Id', order: 'desc', examid: '' }
        },
        // 考试记录详情
        ExamReview: {
            url: API.API_URL + "/Exam/ExamReview",
            data: { parameter1: '', parameter2: '' }
        },
        // 报名培训班
        ApplyClass: {
            url: API.API_URL + "/Page/ApplyClass",
            data: { trainingId: '' }
        },
        // 未读通知
        UnReadNotice: {
            url: API.API_URL + "/Page/NoticeUnReadList",
            data: { page: 1, rows: 7, sort: 'Id', order: 'desc', titleNav: '个人通知', wordLimt: 30 }
        },
        // 修改密码
        UpdatePwd: {
            url: API.API_URL + "/Page/UpdatePwd",
            data: {}
        },
        // 设置密保--密码验证
        SetPasswordQuestion: {
            url: API.API_URL + "/Page/SetPasswordQuestion",
            data: {}
        },
        // 设置密保--添加密保问题
        AddPasswordQuestion: {
            url: API.API_URL + "/Page/AddPasswordQuestion",
            data: { pwd: '' }
        },
        // 修改信息--获取用户详细信息
        GetUserInfo: {
            url: API.API_URL + "/Page/GetUserInfo",
            data: { titleNav: '修改信息' }
        },
        // 修改信息--获取职位分类
        GetGradeList: {
            url: API.API_URL + "/Common/GetGradeList",
            data: {}
        },
        // 修改用户信息
        UpdateUserInfo: {
            url: API.API_URL + "/Page/UpdateUserInfo",
            data: {}
        },
        // 专题培训班--个人学习信息
        ClassInformation: {
            url: API.API_URL + "/Page/ClassInformation",
            data: { titleNav: '个人学习信息', Id: '' }
        },
        // 专题培训班--班级详情
        ClassDetail: {
            url: API.API_URL + "/Page/ClassDetail",
            data: { titleNav: '培训班详情', page: 1, rows: 9, sort: 'Id', order: 'desc' }
        },
        // 专题培训班--教学计划
        ClassPlan: {
            url: API.API_URL + "/Page/ClassPlan",
            data: { titleNav: '教学计划' }
        },
        //  专题培训班--同学名录
        ClassStudent: {
            url: API.API_URL + "/Page/ClassStudent",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '同学名录' }
        },
        // 专题培训班--我的论文
        ClassPaperList: {
            url: API.API_URL + "/Page/ClassPaperList",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级论文', wordLimt: 30 }
        },
        // 专题培训班--班级相册
        PhotoAlbumList: {
            url: API.API_URL + "/Page/PhotoAlbumList",
            data: { page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '班级相册' }
        },
        // 专题培训班--班级话题
        ClassTopicList: {
            url: API.API_URL + "/Page/ClassTopicList",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级话题', wordLimt: 30 }
        },
        // 专题培训班--班级课程
        ClassCourse: {
            url: API.API_URL + "/Page/ClassCourse",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级课程', wordLimt: 30 }
        },
        // 专题培训班--班级公告
        ClassNoticeList: {
            url: API.API_URL + "/Page/ClassNoticeList",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级公告', wordLimt: 30 }
        },
        // 专题培训班--班级考试
        ClassExam: {
            url: API.API_URL + "/Page/ClassExam",
            data: { page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级考试', wordLimt: 30 }
        },
        // 专题培训班--班级文章内容
        ClassArticleDetail: {
            url: API.API_URL + "/Page/ClassArticleDetail",
            data: {}
        },
        // 专题培训班--查看用户权限
        CheckUserClass: {
            url: API.API_URL + "/Page/CheckUserClass",
            data: {}
        },
        // 专题培训班--添加相册
        GetPhotoAlbumAdd: {
            url: API.API_URL + "/Page/GetPhotoAlbumAdd",
            data: {}
        },
        // 专题培训班--添加相册
        PhotoAlbumAdd: {
            url: API.API_URL + "/Page/PhotoAlbumAdd",
            data: { titleNav: '添加相册' }
        },
        // 专题培训班--班级照片
        PhotoPreview: {
            url: API.API_URL + "/Page/PhotoPreview",
            data: { titleNav: '班级图片', page: 1, rows: 9, sort: 'Id', order: 'desc' }
        },
        // 专题培训班--班级照片
        GetPhotoUpFile: {
            url: API.API_URL + "/Page/GetPhotoUpFile",
            data: {}
        },
        // 专题培训班--添加话题
        ClassTopicAdd: {
            url: API.API_URL + "/Page/ClassTopicAdd",
            data: { page: 1, rows: 9, sort: 'Id', order: 'desc' }
        },
        // 专题培训班--添加论文
        ClassPaperAdd: {
            url: API.API_URL + "/Page/ClassPaperAdd",
            data: { page: 1, rows: 9, sort: 'Id', order: 'desc' }
        },
        // 专题培训班--获取分类
        GetTrainingArticleCategory: {
            url: API.API_URL + "/Page/GetTrainingArticleCategory",
            data: {}
        },
        // 专题培训班--发布文章
        ClassPublishArticle: {
            url: API.API_URL + "/Page/ClassPublishArticle",
            data: {}
        },
        // 考试中心--提交考试
        PostExam: {
            url: API.API_URL + "/Exam/PostExam",
            data: {}
        },
        // 邮箱找回密码
        GetPasswordEmail: {
            url: API.API_URL + "/Page/GetPasswordEmail",
            data: {}
        },
        // 获取密保
        GetQuestion: {
            url: API.API_URL + "/Page/GetQuestion",
            data: { account: '' }
        },
        // 提交问题
        GetPasswordByQuestion: {
            url: API.API_URL + "/Page/GetPasswordByQuestion",
            data: { account: '', question: '', answer: '' }
        },
        // 提示未读通知
        UnReadNotice2: {
            url: API.API_URL + "/Page/UnReadNotice",
            data: {}
        },
        // 播放信息
        Play: {
            url: API.API_URL + "/Home/Play",
            data: { id: '' }
        },
        // 刷新播放进度
        Refresh: {
            url: API.API_URL + "/CourseProcess/Refresh",
            data: { PortalId: '', userId: '', courseid: '' }
        },
        // 添加评论
        CourseCommentAdd: {
            url: API.API_URL + "/Page/CourseCommentAdd",
            data: { mainId: '', parentId: '0', content: '', rate: '' }
        },
        // 获取评论
        CourseComment: {
            url: API.API_URL + "/Page/CourseComment",
            data: { id: '', page: '1', rows: '100', sort: 'Id', order: 'Desc' }
        },
        // 播放前调用
        ClearPlayingCourse: {
            url: API.API_URL + "/Page/ClearPlayingCourse",
            data: { userid: '' }
        },
        // 播放plYjwplay
        PlayJwplay: {
            url: API.API_URL + "/Home/PlayJwplay",
            data: { courseid: '' }
        },
        // 单视频播放进度
        SingleProcess: {
            url: API.API_URL + "/CourseProcess/SingleProcess",
            data: { PortalId: '', userid: '', courseid: '', positionen: '' }
        },
        // 播放精英视频
        PlayJY: {
            url: API.API_URL + "/Home/PlayJY",
            data: { courseId: '' }
        },
        // 播放Scorm视频
        PlayScorm: {
            url: API.API_URL + "/Home/PlayScorm",
            data: { courseId: '' }
        },
        // 播放Single视频
        PlaySingle: {
            url: API.API_URL + "/Home/PlaySingle",
            data: { courseId: '' }
        },

    }
};
