<template>
  <div class="question-add">
    <el-dialog
      title="题库列表"
      :visible.sync="$parent.addFormVisible"
      fullscreen
      center
      @opened="opened"
    >
      <el-form :model="form" ref="questionForm" :rules="addRules">
        <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择活动学科">
            <template v-for="(item,index) in $parent.subjectAll">
              <el-option :label="item.name" :value="item.id" :key="index"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
          <el-select v-model="form.step" placeholder="请选择活动阶段">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
          <el-select v-model="form.enterprise" placeholder="请选择活动企业">
            <template v-for="(item,index) in $parent.enterpriseAll">
              <el-option :label="item.name" :value="item.id" :key="index"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover',value:'label'}"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 试题区域 -->
        <el-form-item label="试题标题" :label-width="formLabelWidth" prop="title"></el-form-item>
        <div class="editor-title"></div>
        <div class="editor-conter"></div>
        <!-- 选择区域 -->
        <el-form-item
          class="icon"
          label="单选"
          :label-width="formLabelWidth"
          prop="single_select_answer"
        >
          <el-radio-group v-model="form.single_select_answer">
            <div class="radio-box">
              <el-radio label="A">A</el-radio>
              <el-input v-model="form.select_options[0].text"></el-input>
              <!-- 头像上传 -->
              <el-upload
                class="avatar-uploader"
                :action="upload"
                :show-file-list="false"
                :on-success="handleAvatarASuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="radio-box">
              <el-radio label="B">A</el-radio>
              <el-input v-model="form.select_options[1].text"></el-input>
              <!-- 头像上传 -->
              <el-upload
                class="avatar-uploader"
                :action="upload"
                :show-file-list="false"
                :on-success="handleAvatarBSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="radio-box">
              <el-radio label="C">C</el-radio>
              <el-input v-model="form.select_options[2].text"></el-input>
              <!-- 头像上传 -->
              <el-upload
                class="avatar-uploader"
                :action="upload"
                :show-file-list="false"
                :on-success="handleAvatarCSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="radio-box">
              <el-radio label="D">D</el-radio>
              <el-input v-model="form.select_options[3].text"></el-input>
              <!-- 头像上传 -->
              <el-upload
                class="avatar-uploader"
                :action="upload"
                :show-file-list="false"
                :on-success="handleAvatarDSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <!-- 视频区域 -->
        <el-form-item class="btn" label="解析视频" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="upload"
            :show-file-list="false"
            :on-success="handleVideoSuccess"
            :before-upload="beforeVideoUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <video :src="VideoUrl" v-if="VideoUrl" controls></video>
        </el-form-item>
        <!-- 解析答案 -->
        <el-form-item label="解析答案" :label-width="formLabelWidth" prop="answer_analyze"></el-form-item>
        <div class="answer-title"></div>
        <div class="answer-conter"></div>
        <el-divider></el-divider>
        <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark"></el-form-item>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 API 抽取层
import {questionAdd} from '../../../../API/question.js'

// 导入富文本
import wangeditor from "wangeditor";

// 导入 省市 联动
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      // 表单数据
      form: {
        // 定义省级
        city: [],
        // 定义富文本内容
        title: "",
        // 定义答案富文本
        answer_analyze: "",
        // 单选框数据
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 表单规则
      addRules: {
        // 学科
        subject: [
          {
            required: true,
            message: "请选择学科",
            trigger: "blur"
          }
        ],
        // 阶段
        step: [
          {
            required: true,
            message: "请选择阶段",
            trigger: "blur"
          }
        ],
        // 企业
        enterprise: [
          {
            required: true,
            message: "请选择企业",
            trigger: "blur"
          }
        ],
        // 城市
        city: [
          {
            required: true,
            message: "请选择城市",
            trigger: "blur"
          }
        ],
        // 题型
        type: [
          {
            required: true,
            message: "请选择题型",
            trigger: "blur"
          }
        ],
        // 题目难度
        difficulty: [
          {
            required: true,
            message: "请选择题目难度",
            trigger: "blur"
          }
        ],
        // 标题
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        //单选答案
        single_select_answer:[{
          required: true,
            message: "请输入单选答案",
            trigger: "blur"
        }],
        // 解析答案
        answer_analyze:[{
          required: true,
            message: "请输入解析答案",
            trigger: "blur"
        }],
        // 备注
        remark:[{
          required: true,
            message: "请输入备注",
            trigger: "blur"
        }]
      },
      formLabelWidth: "80px",
      // 定义文本富文本
      editor: undefined,
      // 定义答案富文本
      answerEditor: undefined,
      value: [],
      // 省市联动数据
      options: regionData,
      // 本地图片地址
      imageUrlA: "",
      imageUrlB: "",
      imageUrlC: "",
      imageUrlD: "",
      // 视频地址
      VideoUrl: "",
      // 上传图片地址
      upload: process.env.VUE_APP_baseUrl + "/question/upload"
    };
  },
  methods: {
    // 打开 对话框的回调函数
    opened() {
      if (this.editor == undefined) {
        this.editor = new wangeditor(".editor-title", ".editor-conter");
        // 获取富文本框的内容
        this.editor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.form.title = html;
        };
        this.editor.create();
      }
      if (this.answerEditor == undefined) {
        this.answerEditor = new wangeditor(".answer-title", ".answer-conter");
        // 获取富文本框的内容
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.form.answer_analyze = html;
        };
        this.answerEditor.create();
      }
    },
    // 选择城市 触发的事件
    handleChange(value) {
      this.form.city = value;
    },
    // 单选框 - 头像上传
    // 头像上传成功
    handleAvatarASuccess(res, file) {
      // window.console.log(res);
      this.imageUrlA = URL.createObjectURL(file.raw);
      this.form.select_options[0].image = res.data.url;
    },
    handleAvatarBSuccess(res, file) {
      // window.console.log(res);
      this.imageUrlB = URL.createObjectURL(file.raw);
      this.form.select_options[1].image = res.data.url;
    },
    handleAvatarCSuccess(res, file) {
      // window.console.log(res);
      this.imageUrlC = URL.createObjectURL(file.raw);
      this.form.select_options[2].image = res.data.url;
    },
    handleAvatarDSuccess(res, file) {
      // window.console.log(res);
      this.imageUrlD = URL.createObjectURL(file.raw);
      this.form.select_options[3].image = res.data.url;
    },
    // 头像上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频上传
    handleVideoSuccess(res, file) {
      window.console.log(res);
      this.VideoUrl = URL.createObjectURL(file.raw);
      this.form.video = res.data.url;
    },
    // 视频上传之前
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 提交验证
    submitForm() {
        this.$refs.questionForm.validate((valid) => {
          window.console.log(valid)
          if (valid) {
            questionAdd({
              ...this.form
            }).then(res=>{
              window.console.log(res)
              this.$message.success('新增成功')
              this.$parent.addFormVisible = false
            })
          } else {
            this.$message.error('内容不全')
            return false;
          }
        });
    }
  },
}
</script>

<style lang='less'>
.question-add {
  .el-dialog {
    // 头部标题颜色
    .el-dialog__header {
      background: linear-gradient(to right, #02c5fa, #1394fa);
    }
    // 内盒子居中
    .el-dialog__body {
      width: 60%;
      margin: 0 auto;
      // 下拉框 文字 靠左
      .el-form-item__label {
        text-align: left;
      }
      // 下拉框样式
      .el-select {
        width: 365px;
      }
    }
    // 富文本样式
    .editor-title,
    .editor-conter,
    .answer-title,
    .answer-conter {
      border: 1px solid #000;
    }
    .editor-conter,
    .answer-conter {
      border-top: none;
      height: 100px;
    }
    // 头像上传
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    // 单选框 样式
    .icon {
      margin-top: 60px;
      .radio-box {
        display: flex;
        align-items: center;
        margin-bottom: 45px;
      }
      .el-radio-group {
        width: 100%;
      }
      .el-input {
        margin-right: 20px;
      }
    }

    .btn {
      .el-upload {
        border: none;
      }
    }
    // 视频上传
    video {
      width: 320px;
    }
    .el-upload--text {
      border: none;
    }
  }
}
</style>