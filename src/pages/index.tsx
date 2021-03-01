import React, { useState } from 'react';
import {
  ChartDom,
  TitleLink,
  createColumnLinePlot,
  createLinePlot,
} from '@td-design/charts';
import styles from './index.module.less';
import { data1, comboData, barData as barData1 } from './data';
import { Switch } from 'antd';
import ReactECharts from 'echarts-for-react'; // or var ReactECharts = require('echarts-for-react');
import { Line } from '@ant-design/charts';
import { CustomWindow } from '@/interfaces/common';

const { barData, lineData } = comboData;

export default () => {
  const [theme, setTheme] = useState<string>('light');
  const [name, setname] = useState<string>('');
  const [key, switchKey] = useState<string>('default');
  // const generateData = () => {
  //   const randomArr = Array.from({ length: 30000 }, () => {
  //     return Math.random() * 100;
  //   });
  //   return randomArr.map((item, idx) => ({
  //     year: idx,
  //     value: item,
  //   }));
  // };
  // const dataSource = generateData();

  return (
    <div className={styles.screen}>
      <div className={styles.leftContainer}>
        <div className={styles.switchWrap}>
          <span>切换主题：</span>
          <Switch
            className={styles.changeButton}
            checkedChildren="light 主题"
            unCheckedChildren="dark 主题"
            defaultChecked
            onChange={() => {
              const changedTheme = theme === 'light' ? 'dark' : 'light';
              setTheme(changedTheme);
              ((global as unknown) as CustomWindow).chartConfig.theme = changedTheme;
            }}
          />
        </div>
        {/* <ChartDom
          title="普通折线图示例"
          className={styles.block}
          getDom={dom =>
            createLinePlot({
              dom,
              data: barData1,
              config: {
                xField: 'date',
                yField: 'value',
                seriesField: 'type',
              },
            })
          }
        /> */}
        <ChartDom
          title="普通折线图示例"
          className={styles.normalBlock}
          getDom={dom => {
            const plot = createLinePlot({
              dom,
              data: data1,
              config: {
                xField: 'year',
                yField: 'value',
              },
            });
            return plot;
          }}
        />
        <div className={styles.block}>
          <ReactECharts
            option={{
              grid: {
                top: 20,
              },
              xAxis: {
                type: 'category',
                data: data1.map(item => item.year),
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: data1.map(item => item.value),
                  type: 'line',
                },
              ],
            }}
            notMerge
            lazyUpdate
            theme={theme}
          />
        </div>

        <Line
          className={styles.antdBlock}
          data={data1}
          autoFit={false}
          xField="year"
          yField="value"
          theme={theme}
          point={{
            size: 5,
            shape: 'diamond',
          }}
          label={{
            style: {
              fill: '#aaa',
            },
          }}
          onReady={chartInstance => {
            console.log('chartInstance: ', chartInstance);
          }}
        />
      </div>
      <div>
        <div className={styles.title}>互动示例</div>
        {key === 'default' && (
          <ChartDom
            title="默认折线图"
            className={styles.normalBlock}
            getDom={(dom: HTMLElement) => {
              const plot = createLinePlot({
                dom,
                data: barData1,
                config: {
                  xField: 'date',
                  yField: 'value',
                  seriesField: 'type',
                  padding: [20, 50, 60, 50],
                },
              });
              plot.on('element:click', (ev: any) => {
                if (ev.target.cfg.type === 'marker') {
                  console.log('element:click - 点击Point了');
                  setname(ev.data.data.date + '-' + ev.data.data.type);
                  switchKey('detail');
                }
              });
              plot.on('element:click', (ev: any) => {
                if (ev.target.cfg.type === 'path') {
                  console.log(
                    'element:click -  点击Line了',
                    ev.target.cfg.type,
                  );
                }
              });
              plot.on('plot:click', (ev: any) => {
                console.log('plot:click -  点击图表了', ev);
              });
              return plot;
            }}
          />
        )}
        {key === 'detail' && (
          <ChartDom
            className={styles.normalBlock}
            getDom={(dom: HTMLElement) =>
              createColumnLinePlot({
                dom,
                data: [barData, lineData],
                config: {
                  xField: 'time',
                  yField: ['value', 'count'],
                },
              })
            }
            title={
              <TitleLink
                onClick={() => {
                  switchKey('default');
                }}
                title={name}
              />
            }
          />
        )}
      </div>
    </div>
  );
};
