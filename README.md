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

返回的信息：

```python
        info_list = [({'art': artsum, 'art_need': art_need}),
                     ({'volunteer': volunteersum, 'volunteer_need': volunteer_need}),
                     ({'running': runningsum, 'running_need': running_need}),
                     ({'swimming': swimmingsum, 'swimming_need': swimming_need})]

        data = {
            "code": '200',
            "msg": '成功',
            "data": info_list,
        }

        return HttpResponse(json.dumps(data, ensure_ascii=False), content_type="application/json", charset='utf-8',
                            reason='success')
```

例：

```json
{
    "code": "200",
    "msg": "成功",
    "data": [
        {
            "art": 0,
            "art_need": 2
        },
        {
            "volunteer": 0,
            "volunteer_need": 8
        },
        {
            "running": 0,
            "running_need": 30
        },
        {
            "swimming": 0,
            "swimming_need": 5
        }
    ]
}

```

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
