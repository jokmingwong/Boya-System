import json
import uuid
from django.views.decorators.csrf import csrf_exempt

from django.db.models import Sum
from django.http import JsonResponse, HttpResponse
from user.models import StudentInfo, BoyaInfo, BoyaPic

# from django.views.decorators.csrf import csrf_exempt
# from django.shortcuts import render


# Create your views here

MEDIA_SERVER = 'http://127.0.0.1:8000/media/'


class ImageTool:
    @staticmethod
    def get_new_random_file_name(file_name):
        find_type = False
        for c in file_name:
            if c == '.':
                find_type = True
        if find_type:
            type = file_name.split('.')[-1]
            return str(uuid.uuid1()) + '.' + type
        else:
            return str(uuid.uuid1())


@csrf_exempt
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

        xszcsum=0
        whyssum=0
        kjcxsum=0
        totalsum=0
        xszc_need = 2
        whys_need = 2
        kjcx_need = 2
        total_need = xszc_need + whys_need + kjcx_need

        try:
        # 形式政策
            xszc = BoyaInfo.objects.filter(student_id=student_id, category='xszc').values('category').annotate(
            xszcsum=Sum('incremental'))
            xszcsum=xszc[0]['xszcsum']
        except Exception as e:
            xszcsum=0



        # 文化艺术
        try:
            whys = BoyaInfo.objects.filter(student_id=student_id, category='whys').values('category').annotate(
            whyssum=Sum('incremental'))
            whyssum = whys[0]['whyssum']
        except Exception as e:
            whyssum = 0

        # 科技创新
        try:
            kjcx = BoyaInfo.objects.filter(student_id=student_id, category='kjcx').values('category').annotate(
            kjcxsum=Sum('incremental'))
            kjcxsum = kjcx[0]['kjcxsum']
        except Exception as e:
            kjcxsum = 0

        # 已经完成的博雅进度 通过学号筛查出所有提交记录，然后将他们的增量求和

        totalsum = kjcxsum + whyssum + xszcsum
        # 博雅需要的总进度 通过学号判断，目前写死


        # 需要返回的信息列表
        info_list = [({'total': totalsum, 'total_need': total_need}),
                         ({'xszc': xszcsum, 'xszc_need': xszc_need}),
                         ({'whys': whyssum, 'whys_need': whys_need}),
                         ({'kjcx': kjcxsum, 'kjcx_need': kjcx_need})]

        # 没注意看这是要干嘛，反正照着写了
        data = {
                "code": '200',
                "msg": '成功',
                "data": info_list,
            }

        return HttpResponse(json.dumps(data, ensure_ascii=False), content_type="application/json", charset='utf-8',
                            reason='success')

    else:
        return HttpResponse('It is not a POST request')


@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        # 学生学号
        student_id = request.POST.get('student_id', '')
        # 提交项目的类别
        category = request.POST.get('category', '')
        # 具体描述
        description = request.POST.get('description', '')
        # 本次增量
        incremental = request.POST.get('incremental', '')

        # 没有get到数据
        if student_id == '' or category == '' or description == '' or incremental == '':
            return JsonResponse({'message': 'Please fill all blank'})

        q = BoyaInfo(student_id=student_id, category=category, description=description, incremental=incremental)
        q.save()

        return HttpResponse(json.dumps({
            'success': True,
        }))

@csrf_exempt
def submit_pic(request):
    # 学生学号
    student_id = request.POST.get('student_id', '')
    # 提交项目的类别
    category = request.POST.get('category', '')
    source = request.FILES.get('image')
    if source:
        source.name = ImageTool.get_new_random_file_name(source.name)
        image = BoyaPic(
            student_id=student_id,
            category=category,
            pic=source
        )
        image.save()
        return HttpResponse(json.dumps({
            'success': True,
            'path': MEDIA_SERVER + image.pic.url
        }))

    else:
        return HttpResponse(json.dumps({
            'success': False,
            'error_code': 100
        }))
