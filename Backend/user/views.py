import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponse
from user.models import StudentInfo
from user.models import BoyaInfo

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

        # 获得名字
        # name = StudentInfo.objects.get(student_id=student_id).student_name

        # 以下为虚拟数值，model完善后再进行改动

        # 形式政策
        xszc = BoyaInfo.objects.filter(student_id=student_id, category='形式政策').values('category').annotate(xszcsum=Sum('incremental'))
        xszc_need = 2

        # 文化艺术
        whys = BoyaInfo.objects.filter(student_id=student_id, category='文化艺术').values('category').annotate(whyssum=Sum('incremental'))
        whys_need = 2

        # 科技创新
        kjcx = BoyaInfo.objects.filter(student_id=student_id, category='科技创新').values('category').annotate(kjcxsum=Sum('incremental'))
        kjcx_need = 2

        # 已经完成的博雅进度 通过学号筛查出所有提交记录，然后将他们的增量求和
        total = BoyaInfo.objects.filter(student_id=student_id).values('student_id').annotate(totalsum=Sum('incremental'))
        # 博雅需要的总进度 通过学号判断，目前写死
        total_need = xszc_need + whys_need + kjcx_need

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
        # 具体描述
        description = request.POST.get('description', '')
        # 本次增量
        incremental = request.POST.get('incremental', '')
        # 对应照片
        image = request.POST.get('photo', '')

        # 没有get到数据
        if name == '' or student_id == '' or category == '' or description == '' or incremental == '' or image == '':
            return JsonResponse({'message': 'Please fill all blank'})

        q = BoyaInfo.objects.create(student_id=student_id, category=category, description=description, incremental=incremental, image=image)
