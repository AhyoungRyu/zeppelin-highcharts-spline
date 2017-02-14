# zeppelin-highcharts-spline

[Apache Zeppelin](http://zeppelin.apache.org/) [VISUALIZATION package](http://zeppelin.apache.org/docs/latest/development/writingzeppelinvisualization.html) using spline chart in [Highcharts](http://www.highcharts.com/).

## How to use 

With _Zeppelin-0.7_ (released at Feb 5th, 2017) 

**1.** Place [zeppelin-highcharts-spline.json](https://github.com/AhyoungRyu/zeppelin-highcharts-spline/blob/master/zeppelin-highcharts-spline.json) under your Helium local dir. 
(`ZEPPELIN_HOME/helium/`). If you don't have, just create a new one. 

**2.** Restart Zeppelin under `ZEPPELIN_HOME/`
```
$ ./bin/zeppelin-daemon.sh restart
```

**3.** Browse Zeppelin and go to Helium menu -> enable **zeppelin-highcharts-spline** package 

<img src="https://github.com/AhyoungRyu/zeppelin-highcharts-spline/blob/master/img/enable_helium.gif?raw=true" width="500px" />

**4. Draw graph with example code**

```
%spark

print(s"""%table
Altitude\tTemperature
0\t15\n
10\t-50\n
20\t-56.5\n
30\t-46.5\n
40\t-22.1\n
50\t-2.5\n
60\t-27.7\n
70\t-55.7\n
80\t-76.5""")
```

<img src="https://github.com/AhyoungRyu/zeppelin-highcharts-spline/blob/master/img/draw_graph.gif?raw=true" width="500px" />

After _ZEPPELIN-0.8.0-SNAPSHOT_
don't need local `ZEPPELIN_HOME/helium/` dir. Just go to Helium menu in Zeppelin, and enable the packages you want to use. 
Zeppelin will load available packages from its online repository and show you in Zeppelin GIU.


### LICENSE 
Please see this [LICENSE](./LICENSE).

