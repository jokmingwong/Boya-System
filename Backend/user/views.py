import json
from django.http import JsonResponse, HttpResponse
from user.models import student


# from django.views.decorators.csrf import csrf_exempt
# from django.shortcuts import render


# Create your views here.

def home(request):
    if request.method == 'POST':
        data_string = request.POST
        try:
            student_id = data_string['student_id']
        except Exception as e:
            print(e)
            print('获取数据失败')

        # 通过学号查找数据库记录
        q = student.objects.get(student_id=student_id)

        # 获得名字
        # name = q.name

        # 获得学号
        # student_id = q.student_id

        # 以下为虚拟数值，model完善后再进行改动

        # 已经完成的博雅进度 xszc+whys+kjcx
        total = 6
        # 博雅需要的总进度 xszc_need+whys_need+kjcx_need
        total_need = 8

        # 形式政策
        xszc = 1
        xszc_need = 2

        # 文化艺术
        whys = 1
        whys_need = 2

        # 科技创新
        kjcx = 1
        kjcx_need = 2

        # 需要返回的信息列表
        info_list = [({'total': total, 'total_need': total_need}),
                     ({'xszc': xszc, 'xszc_need': xszc_need}),
                     ({'whys': whys, 'whys_need': whys_need}),
                     ({'kjcx': kjcx, 'kjcx_need': kjcx_need})]

        # 没注意看这是要干嘛，反正照着写了
        data = {
            "code": '200',
            "msg": '成功',
            "data": info_list,
            "total": total
        }

        return HttpResponse(json.dumps(data, ensure_ascii=False), content_type="application/json", charset='utf-8',
                            reason='success')
    else:
        return HttpResponse('It is not a POST request')


def submit(request):
    if request.is_ajax():
        # 学生姓名
        name = request.POST.get('name', '')
        # 学生学号
        student_id = request.POST.get('student_id', '')
        # 提交项目的类别
        category = request.POST.get('category', '')
        # 具体描述，最好是只要数字（x
        description = request.POST.get('description', '')
        # 对应照片
        image = request.POST.get('photo', '')

        # 没有get到数据
        if name == '' or student_id == '' or category == '' or description == '' or image == '':
            return JsonResponse({'message': 'Please fill all blank'})

        # 依据不同的category来往数据库中增加记录，更新不同类别的目前进度，并存入照片（要等model完善了才能具体实现）
