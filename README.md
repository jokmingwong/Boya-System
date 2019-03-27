# 北航志士六艺博雅查询

wxml替代html
wxss替代css
json提供数据交换

上传的图片有:
跑步截图/游泳截图

社团活动

志愿时长截图

文艺活动截图

## 后端接口
查询接口：/user/api/get_all_info

需要的信息包括：student_id

---

表单信息接口：/user/api/submit_form

需要获得的信息包括：student_id, category, description, incremental

对应为：学生学号，提交的类型，具体描述，本次增量

例：

student_id  16000000

category    art

description 参观798（学生随意发挥，可填可不填）

incremental 1（表示增加一次参观次数）

---

图片提交接口：/user/api/submit_pic

需要获得的信息包括：student_id, category, image
