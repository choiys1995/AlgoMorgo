import json

from django.core.cache.backends import redis
from django.shortcuts import get_object_or_404
# from django.utils import timezone
from django_redis import cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework_swagger import renderers
import requests
import pymysql
import time
import pandas as pd
import numpy as np
from numpy import dot
from numpy.linalg import norm
import math
import pickle
import datetime
import pytz
import redis

# 알고리즘 종류
algoList = ['lis',
        'math',
        'knuth',
        'pick',
        'lazyprop',
        'ad_hoc',
        'geometry',
        'planar_graph',
        'offline_dynamic_connectivity',
        'matroid',
        'hirschberg',
        'dp_bitfield',
        'priority_queue',
        'bipartite_graph',
        'two_pointer',
        'geometry_3d',
        'flow',
        'pigeonhole_principle',
        'hash_set',
        'parametric_search',
        'case_work',
        'suffix_tree',
        'sprague_grundy',
        'divide_and_conquer',
        'discrete_log',
        'pollard_rho',
        'stoer_wagner',
        'interpreter',
        'rabin_karp',
        'fft',
        'sparse_table',
        'manacher',
        'burnside',
        'splay_tree',
        'line_intersection',
        'greedy',
        'euler_phi',
        'euclidean',
        'trie',
        'scc',
        'backtracking',
        'prefix_sum',
        'cactus',
        'constructive',
        'general_matching',
        'modular_multiplicative_inverse',
        'mitm',
        'suffix_array',
        'dp',
        'generating_function',
        'green',
        'floyd_warshall',
        'graph_traversal',
        'precomputation',
        'deque',
        'dfs',
        'arithmetic',
        'dp_deque',
        'primality_test',
        'exponentiation_by_squaring',
        'number_theory',
        'smaller_to_larger',
        'biconnected_component',
        'bayes',
        'discrete_sqrt',
        'kitamasa',
        'berlekamp_massey',
        'half_plane_intersection',
        'regex',
        'cht',
        '2_sat',
        'centroid',
        'data_structures',
        'heuristics',
        'palindrome_tree',
        'physics',
        'calculus',
        'mcmf',
        'majority_vote',
        'dijkstra',
        'euler_tour_technique',
        'geometry_hyper',
        'flt',
        'sweeping',
        'link_cut_tree',
        'topological_sorting',
        'bidirectional_search',
        'linearity_of_expectation',
        'duality',
        'sorting',
        'extended_euclidean',
        'hld',
        'inclusion_and_exclusion',
        'segtree',
        'multi_segtree',
        'gaussian_elimination',
        'miller_rabin',
        'hall',
        'simulation',
        'tree_isomorphism',
        'numerical_analysis',
        'hungarian',
        'statistics',
        'probability',
        'mobius_inversion',
        'monotone_queue_optimization',
        'stack',
        'a_star',
        'sqrt_decomposition',
        'mst',
        'tree_set',
        'bipartite_matching',
        'coordinate_compression',
        'alien',
        'crt',
        'articulation',
        'polygon_area',
        'dual_graph',
        'bfs',
        'dancing_links',
        'linear_algebra',
        'simulated_annealing',
        'rb_tree',
        'mfmc',
        'offline_queries',
        'point_in_non_convex_polygon',
        'z',
        'bitmask',
        'convex_hull',
        'eulerian_path',
        'randomization',
        'divide_and_conquer_optimization',
        'lca',
        'pst',
        'min_enclosing_circle',
        'knuth_x',
        'combinatorics',
        'dominator_tree',
        'hashing',
        'linked_list',
        'bruteforcing',
        'linear_programming',
        'top_tree',
        'stable_marriage',
        'rope',
        'dp_connection_profile',
        'slope_trick',
        'graphs',
        'sliding_window',
        'sieve',
        'game_theory',
        'string',
        'binary_search',
        'dp_tree',
        'centroid_decomposition',
        'trees',
        'tree_compression',
        'kmp',
        'rotating_calipers',
        'permutation_cycle_decomposition',
        'euler_characteristic',
        'bellman_ford',
        'voronoi',
        'tsp',
        'lucas',
        'arbitrary_precision',
        'pythagoras',
        '0_1_bfs',
        'bitset',
        'delaunay',
        'pbs',
        'merge_sort_tree',
        'ternary_search',
        'queue',
        'implementation',
        'parsing',
        'disjoint_set',
        'knapsack',
        'point_in_convex_polygon',
        'mo',
        'directed_mst',
        'recursion',
        'aho_corasick'
    ]

# 두 row의 코사인 유사도를 계산하는 함수
def cos_sim(a, b):
    return dot(a, b)/(norm(a)*norm(b))

# 하루에 한번 모든 유저들에 대해 추천할 문제를 만드는 함수
@api_view(['GET'])
def recommendProblemAll(request):
    # mysql 연결
    conn = pymysql.connect(host='j6c204.p.ssafy.io', port=3306, user='C204', password='ssafyC204', db='logTest',charset='utf8')
    # 유저별로 [{푼 문제의 번호: 그 문제의 티어 값, 1002: 11}]
    with open('probPerUser.pickle','rb') as fr:
        probPerUser = pickle.load(fr)
    # 문제 별로 { 문제 번호 : [티어, (있다면) 태그 1, 태그 2 ...]}
    with open('problemWithTag.pickle','rb') as fr:
        problemWithTag = pickle.load(fr)
    # {문제 번호 : 문제 id(sql pk 값)}
    with open('probById.pickle','rb') as fr:
        probById = pickle.load(fr)
    df = pd.read_csv('sample.csv')
    # [0] : 0번 유저 값 = 모두 다 0 , [num][0] : 해당 row의 userId 값 = num , [num][1] ~ [num][끝] : num인 유저의 각 태그 별 푼 갯수
    dfToArray = df.values

    cur = conn.cursor()
    sql = 'SELECT * FROM user'
    cur.execute(sql)
    # 가져온 유저들 : users[num] = 가져온 유저 중 num번째 유저 정보들, users[num][0] : id(pk), users[num][1] : language, users[num][2] : nickname, users[num][3] : password, users[num][4] : baekjoonId, users[num][5] : userId
    users = cur.fetchall()
    result = []
    for user in users:

        baekjoonId = user[4]
        id = user[0]
        url = "https://solved.ac/api/v3/search/problem?query=solved_by%3A" + str(baekjoonId)
        response = requests.get(url)
        userSolvedNums = []
        userSolvedTagNums = np.zeros(len(algoList))
        # sovled.ac api를 이용하여 현재 유저가 푼 문제 번호들을 userSolvedNums에 담고 어떤 알고리즘을 몇개씩 풀었는지 userSolvedTagNums에 담는다.
        if response.status_code == 200:
            # 우리 유저가 푼 문제가 100문제가 넘어서 api를 더 불러야되는지 체크
            count = int(int(response.json()['count'])/100)
            curUserLogs = response.json()['items']
            for log in curUserLogs:
                probNum = int(log['problemId'])
                userSolvedNums.append(probNum)
                tags = problemWithTag[probNum]
                for i in range(1, len(tags)):
                    tag = tags[i]
                    for i in range(0, len(algoList)):
                        if (tag == algoList[i]):
                            userSolvedTagNums[i] += 1
            # 만약 유저가 푼 문제가 100문제가 넘으면 끝날때까지 api 호출과 userSolvedNums, userSolvedTagNums에 담기를 반복
            if(count >= 1):
                for i in range(count):
                    url2 = url + "&page="+str(i+2)
                    response2 = requests.get(url2)
                    if response2.status_code == 200:
                        curUserLogs = response2.json()['items']
                        for log in curUserLogs:
                            probNum = int(log['problemId'])
                            userSolvedNums.append(probNum)
                            tags = problemWithTag[probNum]
                            for i in range(1, len(tags)):
                                tag = tags[i]
                                for i in range(0, len(algoList)):
                                    if (tag == algoList[i]):
                                        userSolvedTagNums[i] += 1
        # 유저 티어 구하기
        sql = "SELECT user_tier FROM baekjoon_user WHERE user_name = %s"
        cur.execute(sql, baekjoonId)
        tmpUserTier = cur.fetchone()
        userTier = 0
        # 유저가 solved.ac 기준 플래티넘 1~실버 5까지 범위에 없다면 tmpUserTier 가 None
        if tmpUserTier == None:
            # 유저 티어를 모르는 경우 지금까지 푼 문제들의 티어의 평균을 그 유저의 티어로 지정
            tierSum = 0
            for i in range(len(userSolvedNums)):
                tierSum = tierSum + problemWithTag[userSolvedNums[i]][0]
            userTier = tierSum/len(userSolvedNums)
        else:
            # 유저 티어를 아는 경우 그 값을 유저 티어로 지정
            userTier = tmpUserTier[0]
        # 만약 유저 티어가 6(실버 5)보다 작으면 추천을 받기 어렵기 때문에 6으로 고정
        if userTier < 6:
            userTier = 6
        # 만약 유저 티어가 20(플래티넘 1)보다 크면 추천을 받기 어렵기 때문에 20으로 고정
        if userTier > 20:
            userTier = 20

        # userSolvedTagNums와 dfToArray(sample.csv)에 있는 row들의 코사인 유사도를 구해서 userId와 그 유저와의 코사인 유사도 값을 csWithAllUser 배열에 저장
        csWithAllUser = []
        for i in range(38383):
            if(i == 0):
                continue;
            oppUserId = int(dfToArray[i][0])
            oppTagNums = dfToArray[i][1:]
            item = {
                'userId': 0,
                'cs': 0.0
            }
            tmp = cos_sim(userSolvedTagNums,oppTagNums)
            if math.isnan(tmp):
                continue
            item['userId'] = oppUserId
            item['cs'] = cos_sim(userSolvedTagNums,oppTagNums)

            csWithAllUser.append(item)
        # csWithAllUser 배열을 코사인 유사도 기준으로 sorting
        sortedCs = sorted(csWithAllUser, key=(lambda x: x['cs']))
        lowNums = []
        highNums = []
        lowCnt = 0
        highCnt = 0
        # 최근 3일동안 미션으로 제시된 문제를 추천하지 않기 위해 recentMissions에 담는다
        sql = "select problem_id from mission where id = %s and success_date is null order by mission_id desc limit 9"
        cur.execute(sql,id)
        tmpRecentMissions = cur.fetchall()
        recentMissions = []
        for tmp in tmpRecentMissions:
            recentMissions.append(tmp[0])

        # 코사인 유사도가 가장 먼 유저가 푼 문제 중에 우리 유저가 안 푼 문제 중 userTier와 비슷한 티어의 문제를 최대 7문제, 코사인 유사도가 가장 가까운 유저의 푼 문제 중 우리 유저가 안풀고 티어가 비슷한 문제 최대 3문제를 배열에 담음
        for i in range(0, len(sortedCs)):
            if i > len(sortedCs) / 2:
                break
            # 코사인 유사도가 가장 먼 유저가 푼 문제를 탐색하면서 조건에 맞는 문제를 최대 7개 배열에 담는다
            if lowCnt < 7:
                candidate = []
                lowId = int(sortedCs[i]['userId'])
                sql = "SELECT user_tier FROM baekjoon_user WHERE user_id = %s"
                cur.execute(sql, str(lowId))
                oppTier = cur.fetchone()[0]
                # 우리 유저와 현재 가장 먼 유저의 티어가 비슷한지(-1~+1) 확인
                if oppTier <= userTier + 1 and oppTier >= userTier - 1:
                    logs = probPerUser[lowId]
                    for key in logs.keys():
                        # 그 유저가 푼 문제 중 우리 유저가 아직 안푼 문제인지 확인
                        if key not in userSolvedNums:
                            # 최근 3일동안 추천된 문제인지 확인
                            if probById[key] not in recentMissions:
                                # 조건에 만족하는 문제를 candidate 배열에 담는다
                                candidate.append(key)
                    # candidate에 담은 문제들 중에
                    for prob in candidate:
                        if lowCnt == 7:
                            break
                        # 해당 문제의 티어를 가져옴
                        probTier = problemWithTag[prob][0]
                        # 해당 문제의 티어가 우리 유저의 티어와 비슷한지(-2~+1)확인
                        if probTier >= userTier - 2 and probTier <= userTier + 1:
                            # 조건을 만족하면 lowNums(추천 문제 배열)에 담는다
                            lowNums.append(prob)
                            lowCnt += 1
            # 코사인 유사도가 가장 가까운 유저가 푼 문제를 탐색하면서 조건에 맞는 문제를 최대 3개 배열에 담는다
            if highCnt < 3:
                candidate = []
                # 상대 유저의 티어를 지정
                highId = int(sortedCs[len(sortedCs) - 1 - i]['userId'])
                sql = "SELECT user_tier FROM baekjoon_user WHERE user_id = %s"
                cur.execute(sql, str(highId))
                oppTier = cur.fetchone()[0]
                # 우리 유저와 현재 가장 먼 유저의 티어가 비슷한지(-1~+1) 확인
                if oppTier <= userTier + 1 and oppTier >= userTier - 1:
                    logs = probPerUser[highId]
                    for key in logs.keys():
                        # 그 유저가 푼 문제 중 우리 유저가 아직 안푼 문제인지 확인
                        if key not in userSolvedNums:
                            # 최근 3일동안 추천된 문제인지 확인
                            if probById[key] not in recentMissions:
                                # 조건에 만족하는 문제를 candidate 배열에 담는다
                                candidate.append(key)
                    # candidate에 담은 문제들 중에
                    for prob in candidate:
                        if highCnt == 3:
                            break
                        # 해당 문제의 티어를 가져옴
                        probTier = problemWithTag[prob][0]
                        # 해당 문제의 티어가 우리 유저의 티어와 비슷한지(-2~+1)확인
                        if probTier >= userTier - 2 and probTier <= userTier + 1:
                            # 조건을 만족하면 highNums(추천 문제 배열)에 담는다
                            highNums.append(prob)
                            highCnt += 1
            # 추천 문제가 총 10문제가 되면 빠져나간다
            if lowCnt + highCnt == 10:
                break
        missionId = []
        lowIdx = 0
        highIdx = 0
        # 추천된 lowNums와 highNums에서 low,low,high,low,low,high ''' 순으로 최종 추천 배열 missionId에 담는다
        for i in range(len(lowNums) + len(highNums)):
            if (i + 1) % 3 == 0:
                missionId.append(probById[highNums[highIdx]])
                highIdx += 1
            else:
                missionId.append(probById[lowNums[lowIdx]])
                lowIdx += 1
        # 현재 유저의 id를 key로 추천 문제 배열(missionId)을 value로 redis에 저장
        insertRedis(id, missionId)


    return Response(result,status = status.HTTP_200_OK);

# 처음 가입한 유저를 위해 한명에 대해 문제를 추천해주는 함수
@api_view(['GET'])
def recommendProblemOne(request,userId):
    print("recommendProblemOne")
    # mysql 연결
    conn = pymysql.connect(host='j6c204.p.ssafy.io', port=3306, user='C204', password='ssafyC204', db='logTest',charset='utf8')
    # 유저별로 [{푼 문제의 번호: 그 문제의 티어 값}]
    with open('probPerUser.pickle','rb') as fr:
        probPerUser = pickle.load(fr)
    # 문제 별로 { 문제 번호 : [티어, (있다면) 태그 1, 태그 2 ...]}
    with open('problemWithTag.pickle','rb') as fr:
        problemWithTag = pickle.load(fr)
    # {문제 번호 : 문제 id(sql pk 값)}
    with open('probById.pickle','rb') as fr:
        probById = pickle.load(fr)

    df = pd.read_csv('sample.csv')
    # [0] : 0번 유저 값 = 모두 다 0 , [num][0] : 해당 row의 userId 값 = num , [num][1] ~ [num][끝] : num인 유저의 각 태그 별 푼 갯수
    dfToArray = df.values

    cur = conn.cursor()
    sql = 'SELECT * FROM user WHERE user_id = %s'
    cur.execute(sql,userId)
    # 가져온 유저들 : users[num] = 가져온 유저 중 num번째 유저 정보들, users[num][0] : id(pk), users[num][1] : language, users[num][2] : nickname, users[num][3] : password, users[num][4] : baekjoonId, users[num][5] : userId
    user = cur.fetchone()
    print(user)
    baekjoonId = user[4]
    print("id : "+str(id)+" baekjoonId : "+str(baekjoonId)+" userId : "+userId)
    url = "https://solved.ac/api/v3/search/problem?query=solved_by%3A" + str(baekjoonId)
    response = requests.get(url)
    userSolvedNums = []
    userSolvedTagNums = np.zeros(len(algoList))
    if response.status_code == 200:
        # 우리 유저가 푼 문제가 100문제가 넘어서 api를 더 불러야되는지 체크
        count = int(int(response.json()['count'])/100)
        curUserLogs = response.json()['items']
        for log in curUserLogs:
            probNum = int(log['problemId'])
            userSolvedNums.append(probNum)
            tags = problemWithTag[probNum]
            for i in range(1, len(tags)):
                tag = tags[i]
                for i in range(0, len(algoList)):
                    if (tag == algoList[i]):
                        userSolvedTagNums[i] += 1
        if(count >= 1):
            for i in range(count):
                url2 = url + "&page="+str(i+2)
                response2 = requests.get(url2)
                if response2.status_code == 200:
                    curUserLogs = response2.json()['items']
                    for log in curUserLogs:
                        probNum = int(log['problemId'])
                        userSolvedNums.append(probNum)
                        tags = problemWithTag[probNum]
                        for i in range(1, len(tags)):
                            tag = tags[i]
                            for i in range(0, len(algoList)):
                                if (tag == algoList[i]):
                                    userSolvedTagNums[i] += 1
        # 유저 티어 구하기
        sql = "SELECT user_tier FROM baekjoon_user WHERE user_name = %s"
        cur.execute(sql, baekjoonId)
        tmpUserTier = cur.fetchone()
        userTier = 0
        if tmpUserTier == None:
            tierSum = 0
            for i in range(len(userSolvedNums)):
                tierSum = tierSum + problemWithTag[userSolvedNums[i]][0]
            userTier = tierSum / len(userSolvedNums)
        else:
            userTier = tmpUserTier[0]
        if userTier < 6:
            userTier = 6
        if userTier > 20:
            userTier = 20
        # sample에 있는 값들과 코사인 유사도를 구해서 배열에 저장
        csWithAllUser = []
        for i in range(38383):
            if(i == 0):
                continue;
            oppUserId = int(dfToArray[i][0])
            oppTagNums = dfToArray[i][1:]
            item = {
                'userId': 0,
                'cs': 0.0
            }
            tmp = cos_sim(userSolvedTagNums,oppTagNums)
            if math.isnan(tmp):
                continue
            item['userId'] = oppUserId
            item['cs'] = cos_sim(userSolvedTagNums,oppTagNums)

            csWithAllUser.append(item)
        # 코사인 유사도 기준으로 sorting
        sortedCs = sorted(csWithAllUser, key=(lambda x:x['cs']))
        lowNums= []
        highNums =[]
        lowCnt = 0
        highCnt = 0
        for i in range(0,len(sortedCs)):
            if i> len(sortedCs)/2:
                break
            if(lowCnt <7):
                candidate = []
                lowId = int(sortedCs[i]['userId'])
                sql = "SELECT user_tier FROM baekjoon_user WHERE user_id = %s"
                cur.execute(sql, str(lowId))
                oppTier = cur.fetchone()[0]
                if oppTier <= userTier+1 and oppTier >= userTier-1:
                    logs = probPerUser[lowId]
                    for key in logs.keys():
                        if not(key in userSolvedNums):
                            candidate.append(key)
                    for prob in candidate:
                        if lowCnt == 7:
                            break
                        probTier = problemWithTag[prob][0]
                        if probTier >= userTier-2 and probTier <= userTier+1:
                            lowNums.append(prob)
                            lowCnt += 1
            if(highCnt <3):
                candidate = []
                highId = int(sortedCs[len(sortedCs)-1-i]['userId'])
                sql = "SELECT user_tier FROM baekjoon_user WHERE user_id = %s"
                cur.execute(sql, str(highId))
                oppTier = cur.fetchone()[0]
                if oppTier <= userTier + 1 and oppTier >= userTier - 1:
                    logs = probPerUser[highId]
                    for key in logs.keys():
                        if not (key in userSolvedNums):
                            candidate.append(key)
                    for prob in candidate:
                        if highCnt == 3:
                            break
                        probTier = problemWithTag[prob][0]
                        if probTier >= userTier - 2 and probTier <= userTier + 1:
                            highNums.append(prob)
                            highCnt += 1
            if lowCnt+highCnt == 10:
                break
        missionId = []
        lowIdx = 0
        highIdx =0
        for i in range(len(lowNums)+len(highNums)):
            if (i+1)%3 ==0 :
                missionId.append(probById[highNums[highIdx]])
                highIdx += 1
            else:
                missionId.append(probById[lowNums[lowIdx]])
                lowIdx += 1
        insertRedis(id,missionId)


    return Response(status = status.HTTP_200_OK);

# 추천에 사용할 파일들을 만드는 함수
@api_view(['GET'])
def updateFiles(request):
    print("update file")
    createProblemWithTag()
    createFromLog()

    return Response(status=status.HTTP_200_OK);

# db의 log테이블과 problemWithTag 배열을 이용해 problemPerUser, sample, probById 배열을 만들고 파일로 저장하는 함수
def createFromLog():
    with open('problemWithTag.pickle','rb') as fr:
        problemWithTag = pickle.load(fr)

    KNNTable = np.zeros((38383, len(algoList)))
    probPerUser = [{} for i in range(38383)]
    conn = pymysql.connect(host='j6c204.p.ssafy.io', port=3306, user='C204', password='ssafyC204', db='logTest',
                           charset='utf8')
    cur = conn.cursor()
    sql = 'SELECT problem_num,problem_id FROM problem order by problem_id'
    cur.execute(sql)
    probs = cur.fetchall()
    probById = {}
    for i in range(0,len(probs)):
        probById[probs[i][0]] = probs[i][1]
    sql2 = 'SELECT * FROM log'
    cur.execute(sql2)
    logs = cur.fetchall()

    for log in logs:
        print(log[0])
        # log[0] : 로그 아이디(log_id) , log[1] : 문제 아이디(problem_id), log[2] : 유저 아이디(user_id)
        try:
            probNum = probs[log[1] - 1][0]
            tags = problemWithTag[probNum]
            probPerUser[log[2]][probNum] = tags[0]
            for i in range(1,len(tags)):
                tag = tags[i]
                for i in range(0, len(algoList)):
                    if (tag == algoList[i]):
                        KNNTable[log[2]][i] += 1
        except:
            df = pd.DataFrame(KNNTable)
            df.to_csv('sample.csv', sep=',')
    df = pd.DataFrame(KNNTable)
    df.to_csv('sample.csv', sep=',')
    with open('probPerUser.pickle', 'wb') as fw:
        pickle.dump(probPerUser,fw)

    with open('probById.pickle', 'wb') as fw:
        pickle.dump(probById,fw)

# solved.ac api를 통해 문제들을 가져와서 각 문제당 어떤 태그들이 달려있는지 dict형태로 만들어 파일에 저장하는 함수
def createProblemWithTag():
    problemWithTag = {}
    for i in range(1, 230):
        url = "https://solved.ac/api/v3/search/problem?query=%22%22&page=" + str(i)
        response = requests.get(url)
        if response.status_code == 200:
            print(i)
            for res in response.json()['items']:
                probNum = res['problemId']
                tmp = []
                tmp.append(res['level'])
                for tag in res['tags']:
                    tagName = tag['key']
                    tmp.append(tagName)
                problemWithTag[probNum] = tmp
        if response.status_code == 429:
            print(response.reason)
            time.sleep(600)
    with open('problemWithTag.pickle', 'wb') as fw:
        pickle.dump(problemWithTag,fw)

# 선정 된 추천 문제를 redis에 담는 함수
def insertRedis(userId, problems):

    rs = redis.StrictRedis(host="j6c204.p.ssafy.io", port=8180, db=0)
    rs.hset("userId:" + str(userId), "_class", "com.assj.algomorgobusiness.dto.RedisDto")

    for i, problem in enumerate(problems):
        creatDate = datetime.datetime.now(pytz.timezone('Asia/Seoul'))
        creatDate = creatDate.strftime('%Y-%m-%d')
        flag = False
        if i < 3:
            flag = True
        flagStr = 0
        if flag:
            flagStr = 1

        rs.hset("userId:" + str(userId), "infoList.["+str(i)+"].createDate", str(creatDate))
        rs.hset("userId:" + str(userId), "infoList.["+str(i)+"].successDate", "null")
        rs.hset("userId:" + str(userId), "infoList.["+str(i)+"].problemId", str(problem))
        rs.hset("userId:" + str(userId), "infoList.["+str(i)+"].selected", str(flagStr))
    rs.hset("userId:" + str(userId), "userId", userId)
