from multiprocessing import Process, Queue


def process1(q: Queue):
    for i in range(100):
        q.put("process1: %s" % i)
        print('process1', i)


def process2(q: Queue):
    for i in range(100):
        q.put("process2: %s" % i)
        print('process2', i)


# process1()
if __name__ == "__main__":
    q = Queue()
    p1 = Process(target=process1, args=(q,))
    p1.start()
    p1.join()
    p2 = Process(target=process2, args=(q,))
    p2.start()
    p2.join()

    print(q.get())
    print(q.get())
    print(q.get())
    print(q.get())
