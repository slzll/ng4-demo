import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common-service.service";
import {GlobalConfig} from "../../global-config";
import 'bootstrap';
@Component({
  selector: 'app-my-center',
  templateUrl: './my-center.component.html',
  styleUrls: ['./my-center.component.css']
})
export class MyCenterComponent implements OnInit {
  //个人中心
  selectedName = {};
  //搜索title
  searchTitle = '';
  paginationConf = $.extend({},GlobalConfig.paginationConf,{itemsPerPage: GlobalConfig.ALL_PORT.MyCenter.data.rows});
  courseStatus = [
    { name: '所有', id: 'All' },
    { name: '正在学习课程', id: 'Unfinish' },
    { name: '指定课程', id: 'Appointed' },
    { name: '已完成课程', id: 'Finish' }
  ];
  vm = {
    activeTab:1
  };
  modalBody1 = true;
  modalBody2 = false;
  modalBody21 = true;
  courseId = '';
  courseName = '';
  noteid = '';
  remindCycle = ['每天一次', '每周一次', '每月一次'];
  TotalData:any;
  planAddData={
    planAddData:''
  };
  nodeAddData: any;
  noteName: string;
  noteContent: string;
  token=this.service.AntiForgeryToken();
  seeNoteData:any;
  courseExamListData:any;
  selectedName2: any;
  PlanFinishDate: any;
  RemindDate: any;
  seePlanData={
    Remark:''
  };
  selectedName3: string;
  PlanFinishDate2: any;
  RemindDate2: any;
  pageCount:number;

  constructor(private service: CommonService) { }

  //学习课程请求
  searchMyCenterCourse(option?:any) {
    let params = $.extend({}, GlobalConfig.ALL_PORT.MyCenter.data, option);
    //console.log(params);
    this.service.getData('MyCenter',params)
      .then((response) => {
        this.TotalData = response.Data;
        if (params.courseType == "Unfinish") {
          this.vm.activeTab = 1;
          this.paginationConf.totalItems = response.Data.UnfinishCount;
        } else if (params.courseType == "Appointed") {
          this.vm.activeTab = 2;
          this.paginationConf.totalItems = response.Data.AppointedCount;
        } else if (params.courseType == "Finish") {
          this.vm.activeTab = 3;
          this.paginationConf.totalItems = response.Data.FinishCount;
        } else if (params.courseType == "All") {
          if (this.vm.activeTab == 1) {
            this.paginationConf.totalItems = response.Data.UnfinishCount;
          } else if (this.vm.activeTab == 2) {
            this.paginationConf.totalItems = response.Data.AppointedCount;
          } else if (this.vm.activeTab == 3) {
            this.paginationConf.totalItems = response.Data.FinishCount;
          }
        }
      });
  }

  //学习进度排序
  learningProgress (type) {
    if ($('.getorder span').html() == '▼') {
      $('.getorder span').html('▲');
      this.searchMyCenterCourse({ order: 'asc', courseType: type });
    } else {
      $('.getorder span').html('▼');
      this.searchMyCenterCourse({ order: 'desc', courseType: type });
    }
  };


  //添加笔记
  nodeAdd(id) {
    this.courseId = id;
    this.modalBody1 = true;
    this.modalBody2 = false;
    this.service.getData('NoteAdd',$.extend({}, GlobalConfig.ALL_PORT.NoteAdd.data, { courseId: id }))
      .then((response) => {
        this.nodeAddData = response.Data;
        this.noteName = '';
        this.noteContent = '';
      });
  };

  //编辑笔记后提交请求
  editNote (options) {
    let editNoteParams = $.extend({}, GlobalConfig.ALL_PORT.AddNote.data, this.token, options);
    if (editNoteParams.Name.length < 2) {
      alert('笔记名称字数不能少于2个字！');
    } else if (editNoteParams.Content.length < 7) {
      alert('笔记内容字数不能少于7个字');
    } else if (editNoteParams.Content.length >= 249) {
      alert('笔记内容字数不能超过249个字');
    } else if (editNoteParams.Name.length >= 2 && editNoteParams.Content.length < 249) {
      this.service.getData('AddNote', editNoteParams)
        .then((response) => {
          $('.modal').modal('hide');
          alert('添加完成！')
          if (this.vm.activeTab == 1) {
            this.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': this.searchTitle });
          } else if (this.vm.activeTab == 2) {
            this.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': this.searchTitle });
          } else {
            this.searchMyCenterCourse({ 'courseType': 'Finish', 'title': this.searchTitle });
          }
        });
    }

  }

  //查看笔记
  seeNote (id, courseName) {
    this.courseId = id;
    this.courseName = courseName;
    this.modalBody1 = false;
    this.modalBody2 = true;
    this.modalBody21 = true;
    this.service.getData('CourseNoteList', $.extend({}, GlobalConfig.ALL_PORT.CourseNoteList.data, { CourseId: id }))
      .then((response) => {
        response.Data.CourseName = courseName;
        this.seeNoteData = response.Data;
        this.pageCount=Math.ceil(response.Data.Count/response.Data.Rows)

        /*$('.modal').modal('hide');
        alert('添加完成！')*/
      });
  }

  //编辑
  noteUpdate(id) {
    this.noteid = id;
    this.modalBody1 = false;
    this.modalBody2 = true;
    this.modalBody21 = false;
    this.service.getData('NoteUpdate',{ noteid: id })
      .then((response) => {
      this.noteName = response.Name;
      this.noteContent = response.Content;
    });

  }

  //提交编辑
  addNoteUpdate(options) {
    this.service.getData('NoteUpdate',$.extend({}, GlobalConfig.ALL_PORT.NoteUpdate.data, this.token, options, { Id: this.noteid }))
      .then((response) => {
        if (response.Type == 1) {
          alert('更新成功');
          $('.modal').modal('hide');
        }
      });
  }

  //删除笔记
  delNote (id) {
    this.service.getData('DelNote', $.extend({}, GlobalConfig.ALL_PORT.DelNote.data, this.token, { Id: id }))
      .then((response)=>{
        if (response.Type == 1) {
          alert("删除成功！");
          this.seeNote(this.courseId, this.courseName);
          if (this.vm.activeTab == 1) {
            this.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': this.searchTitle });
          } else if (this.vm.activeTab == 2) {
            this.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': this.searchTitle });
          } else {
            this.searchMyCenterCourse({ 'courseType': 'Finish', 'title': this.searchTitle });

          }
        }
      });
  }

  //添加计划

  planAdd (id) {
    this.modalBody1 = true;
    this.modalBody2 = false;
    this.service.getData('StudyPlanAdd',$.extend({}, GlobalConfig.ALL_PORT.StudyPlanAdd.data, { courseId: id }))
      .then((response) => {
        this.selectedName2 = this.remindCycle[0];
        this.planAddData = response.Data;
        this.PlanFinishDate = this.service.dateFilter(response.Data.PlanFinishDate, 'yyyy-MM-dd');
        this.RemindDate = this.service.dateFilter(response.Data.RemindDate, 'yyyy-MM-dd');

      });
  }

  //提交计划
  addPlan (options) {
    let editPlanParams = $.extend({}, GlobalConfig.ALL_PORT.AddStudyPlan.data, this.token, options);
    // console.log(editPlanParams);
    if (editPlanParams.Remark.length < 7) {
      alert("计划内容字数不能少于7个字！");
    } else if (editPlanParams.Remark.length >= 249) {
      alert('计划内容字数不能超过249个字');
    } else {
      this.service.getData('AddStudyPlan',editPlanParams)
        .then((response) =>{
          $('.modal').modal('hide');
          alert('添加完成！')
          if (this.vm.activeTab == 1) {
            this.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': this.searchTitle });
          } else if (this.vm.activeTab == 2) {
            this.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': this.searchTitle });
          } else {
            this.searchMyCenterCourse({ 'courseType': 'Finish', 'title': this.searchTitle });
          }
        });
    }

  }


  //查看计划
  seePlan(id, courseName) {
    this.courseId = id;
    this.courseName = courseName;
    this.modalBody1 = false;
    this.modalBody2 = true;
    this.service.getData('StudyPlanUpdate',$.extend({}, GlobalConfig.ALL_PORT.StudyPlanUpdate.data, { courseId: id }))
      .then((response) => {
        response.Data.CourseName = courseName;
        this.seePlanData = response.Data;
        this.selectedName3 = response.Data.RemindCycle;
        this.PlanFinishDate2 = this.service.dateFilter(response.Data.PlanFinishDate, 'yyyy-MM-dd');
        this.RemindDate2 = this.service.dateFilter(response.Data.RemindDate, 'yyyy-MM-dd');

      });
  }

  //提交编辑计划
  addPlanUpdate (options) {
    var addPlanUpdateParams = $.extend({}, GlobalConfig.ALL_PORT.EditStudyPlanUpdate.data, this.token, options);
    if (addPlanUpdateParams.Remark.length < 7) {
      alert("计划内容字数不能少于7个字！");
    } else if (addPlanUpdateParams.Remark.length >= 249) {
      alert('计划内容字数不能超过249个字');
    } else {
      this.service.getData('EditStudyPlanUpdate',addPlanUpdateParams)
        .then((response) => {
          $('.modal').modal('hide');
          alert(response.Message)
          if (this.vm.activeTab == 1) {
            this.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': this.searchTitle });
          } else if (this.vm.activeTab == 2) {
            this.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': this.searchTitle });
          } else {
            this.searchMyCenterCourse({ 'courseType': 'Finish', 'title': this.searchTitle });
          }
        });
    }
  }

  //删除课程
  deleatUserCourse(id) {
    this.service.getData('DelUserCourseReg', $.extend({}, GlobalConfig.ALL_PORT.DelUserCourseReg.data, this.token, { courseId: id }))
      .then((response) => {
        if (response.Type == 1) {
          alert(response.Message)
          if (this.vm.activeTab == 1) {
            this.searchMyCenterCourse({ 'courseType': 'Unfinish', 'title': this.searchTitle });
          } else if (this.vm.activeTab == 2) {
            this.searchMyCenterCourse({ 'courseType': 'Appointed', 'title': this.searchTitle });
          } else {
            this.searchMyCenterCourse({ 'courseType': 'Finish', 'title': this.searchTitle });
          }
        } else if (response.Type == 0) {
          alert(response.Message);
        }

      });
  };

  //查看考试列表
  courseExamList (id) {
    this.service.getData('CourseExamList', $.extend({}, GlobalConfig.ALL_PORT.CourseExamList.data, { courseId: id }))
      .then((response) => {
        this.courseExamListData = response.Data;
      });
  };

  //参加测试
  havTest(Id) {
    let params = $.extend({}, GlobalConfig.ALL_PORT.Exam.data, this.token, { parameter1: Id })
    this.service.getData('Exam', params)
      .then((response) => {
      if (response.Type) {
        //Type存在，意味着不能考试
        alert(response.Message);
      } else {
        window.open("#/exam/exam/" + Id);
      }

    });
  };

  ngOnInit() {
    this.searchMyCenterCourse();
    this.selectedName = this.courseStatus[0];
  }

}
