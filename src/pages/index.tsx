import React from 'react';
import styles from './index.module.less';
import { Card, Select, Collapse, Input, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { INITIAL_VALUE } from '@/constant';
import { useImmer } from 'use-immer';

const { Panel } = Collapse;

interface StateProps {
  dimensions: string[];
  dimensionsLength: number;
  seriesLayoutBy: string;
  fromDatasetIndex: number;
  transformType: string;
  dimension: string;
  dimensionFilter: string;
  dimensionValue: number | string;
  encodeX: string;
  encodeY: string;
  tooltip: string[];
}

const initialState = {
  dimensions: ['product', '2015', '2016', '2017'],
  dimensionsLength: 3,
  seriesLayoutBy: 'row',
  fromDatasetIndex: 1,
  transformType: 'filter',
  dimension: 'Sales',
  dimensionFilter: '>',
  dimensionValue: INITIAL_VALUE,
  encodeX: 'score',
  encodeY: 'product',
  tooltip: [],
};

export default () => {
  const [state, setState] = useImmer<StateProps>(initialState);
  const {
    dimensions,
    seriesLayoutBy,
    fromDatasetIndex,
    transformType,
    dimension,
    dimensionFilter,
    dimensionValue,
    encodeX,
    encodeY,
    tooltip,
  } = state;

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <Card title="1.dataset 基本用法" className={styles.cardWrap}>
          <ReactECharts
            option={{
              grid: {
                top: 20,
              },
              tooltip: {},
              dataset: [
                {
                  source: [
                    ['product', '2015', '2016', '2017'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1],
                  ],
                },
                {
                  datasetId: '2',
                  transform: {
                    type: 'filter',
                    config: {
                      dimension: '2015',
                      '>': 80,
                    },
                  },
                },
              ],
              xAxis: {
                type: 'category',
              },
              yAxis: {},
              series: [
                {
                  type: 'bar',
                },
              ],
            }}
            lazyUpdate
          />
        </Card>
        <Card title="2.dimensions 维度" className={styles.cardWrap}>
          <ReactECharts
            option={{
              legend: {},
              tooltip: {},
              dataset: {
                // 用 dimensions 指定了维度的顺序。直角坐标系中，
                // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
                // 如果不指定 dimensions，也可以通过指定 series.encode
                dimensions,
                source: [
                  {
                    product: 'Matcha Latte',
                    '2015': 43.3,
                    '2016': 85.8,
                    '2017': 93.7,
                  },
                  {
                    product: 'Milk Tea',
                    '2015': 83.1,
                    '2016': 73.4,
                    '2017': 55.1,
                  },
                  {
                    product: 'Cheese Cocoa',
                    '2015': 86.4,
                    '2016': 65.2,
                    '2017': 82.5,
                  },
                  {
                    product: 'Walnut Brownie',
                    '2015': 72.4,
                    '2016': 53.9,
                    '2017': 39.1,
                  },
                ],
              },
              xAxis: { type: 'category' },
              yAxis: {},
              series: Array.from({ length: 3 }, () => ({
                type: 'bar',
              })),
            }}
            lazyUpdate
          />
        </Card>
        <Card title="3.seriesLayoutBy 数据方向" className={styles.cardWrap}>
          <ReactECharts
            option={{
              legend: {},
              tooltip: {},
              dataset: {
                source: [
                  ['product', '2012', '2013', '2014', '2015'],
                  ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                  ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                  ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
                ],
              },
              xAxis: [
                { type: 'category', gridIndex: 0 },
                { type: 'category', gridIndex: 1 },
              ],
              yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
              grid: [
                { top: '25%', bottom: '50%' },
                { top: '60%', bottom: '15%' },
              ],
              series: [
                // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
                { type: 'bar', seriesLayoutBy },
                { type: 'bar', seriesLayoutBy },
                { type: 'bar', seriesLayoutBy },
                // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
                { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
              ],
            }}
            lazyUpdate
          />
        </Card>
        <Card title="4.filter transform" className={styles.longCardWrap}>
          <ReactECharts
            option={
              {
                tooltip: {},
                dataset: [
                  {
                    source: [
                      ['Product', 'Sales', 'Price', 'Year'],
                      ['Cake', 123, 32, 2011],
                      ['Cereal', 231, 14, 2011],
                      ['Tofu', 235, 5, 2011],
                      ['Dumpling', 341, 25, 2011],
                      ['Biscuit', 122, 29, 2011],
                      ['Cake', 143, 30, 2012],
                      ['Cereal', 201, 19, 2012],
                      ['Tofu', 255, 7, 2012],
                      ['Dumpling', 241, 27, 2012],
                      ['Biscuit', 102, 34, 2012],
                    ],
                  },
                  {
                    id: 'test',
                    transform: {
                      type: 'filter',
                      config: { dimension: 'Year', '=': 2011 },
                    },
                  },
                  {
                    fromDatasetIndex,
                    transform: {
                      type: transformType,
                      config: {
                        dimension,
                        [dimensionFilter]:
                          dimensionFilter === 'reg'
                            ? dimensionValue === '//'
                              ? ''
                              : eval('' + dimensionValue)
                            : dimensionValue,
                      },
                    },
                  },
                ],
                series: [
                  {
                    type: 'pie',
                    radius: 50,
                    center: ['30%', '50%'],
                    datasetIndex: 1,
                  },
                  {
                    type: 'pie',
                    radius: 50,
                    center: ['70%', '50%'],
                    datasetIndex: 2,
                  },
                ],
              } as echarts.EChartOption
            }
            lazyUpdate
          />
        </Card>
        <Card title="5.encode 映射" className={styles.longCardWrap}>
          <ReactECharts
            option={{
              dataset: [
                {
                  source: [
                    ['score', 'amount', 'product'],
                    [89.3, 58212, 'Latte'],
                    [57.1, 78254, 'Tea'],
                    [74.4, 41032, 'Cocoa'],
                    [50.1, 12755, 'Cheese'],
                    [89.7, 20145, 'Cocoa'],
                    [68.1, 79146, 'Tea'],
                    [19.6, 91852, 'Orange'],
                    [10.6, 101852, 'Lemon'],
                    [32.7, 20112, 'Brownie'],
                  ],
                },
                {
                  datasetId: '2',
                  transform: {
                    type: 'filter',
                    config: {
                      dimension: 'score',
                      '>': 80,
                    },
                  },
                },
              ],
              tooltip: {},
              xAxis: { type: encodeX === 'product' ? 'category' : 'value' },
              yAxis: { type: encodeY === 'product' ? 'category' : 'value' },
              series: [
                {
                  fromDatasetId: '2',
                  type: 'bar',
                  encode: {
                    x: encodeX,
                    y: encodeY,
                    tooltip,
                  },
                },
              ],
              grid: {
                left: '16%',
              },
            }}
            lazyUpdate
          />
        </Card>
      </div>
      <div className={styles.configWrap}>
        <div className={styles.headerWrap}>设置面板</div>
        <Collapse>
          <Panel header="1.dataset 基本用法" key="1" showArrow={false}>
            <p>
              source 类似表格的概念，如果没有提供dimensions，则按照 source
              第一行为表头，后续行是数据的表格体。如果给了 dimensions，则 source
              可以用常见的对象数组。
            </p>
            <div
              className={styles.marginTop}
              dangerouslySetInnerHTML={{
                __html: `<pre>option = {
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1],
    ],
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
    },
    { type: 'bar' },
    { type: 'bar' },
  ],
}</pre>`,
              }}
            />
          </Panel>
          <Panel header="2.dimensions 维度" key="2" showArrow={false}>
            <span>dimensions：</span>
            <Select
              defaultValue={['product', '2015', '2016', '2017']}
              style={{ width: 300 }}
              onChange={value =>
                setState(config => {
                  config.dimensions = value;
                  config.dimensionsLength = value.length - 1;
                })
              }
              options={[
                {
                  label: '[product, 2015, 2016, 2017]',
                  value: ([
                    'product',
                    '2015',
                    '2016',
                    '2017',
                  ] as unknown) as string,
                },
                {
                  label: '[product, 2015, 2016]',
                  value: (['product', '2015', '2016'] as unknown) as string,
                },
                {
                  label: '[product, 2015]',
                  value: (['product', '2015'] as unknown) as string,
                },
              ]}
            />
            <div
              className={styles.marginTop}
              dangerouslySetInnerHTML={{
                __html: `<pre>option = {
  dataset: {
    dimensions: [${dimensions}],
    source: [
      {
        product: 'Matcha Latte',
        '2015': 43.3,
        '2016': 85.8,
        '2017': 93.7,
      },
      {
        product: 'Milk Tea',
        '2015': 83.1,
        '2016': 73.4,
        '2017': 55.1,
      },
      {
        product: 'Cheese Cocoa',
        '2015': 86.4,
        '2016': 65.2,
        '2017': 82.5,
      },
      {
        product: 'Walnut Brownie',
        '2015': 72.4,
        '2016': 53.9,
        '2017': 39.1,
      },
    ],
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
}</pre>`,
              }}
            />
          </Panel>
          <Panel header="3.seriesLayoutBy 数据方向" key="3" showArrow={false}>
            <span>seriesLayoutBy：</span>
            <Select
              defaultValue="row"
              style={{ width: 200 }}
              onChange={value =>
                setState(config => {
                  config.seriesLayoutBy = value;
                })
              }
              options={[
                { label: 'column', value: 'column' },
                { label: 'row', value: 'row' },
              ]}
            />
            <div
              className={styles.marginTop}
              dangerouslySetInnerHTML={{
                __html: `<pre>option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
    ],
  },
  xAxis: [
    { type: 'category', gridIndex: 0 },
    { type: 'category', gridIndex: 1 },
  ],
  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  grid: [
    { top: '25%', bottom: '50%' },
    { top: '60%', bottom: '15%' },
  ],
  series: [
    // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
    { type: 'bar', seriesLayoutBy: ${seriesLayoutBy} },
    { type: 'bar', seriesLayoutBy: ${seriesLayoutBy} },
    { type: 'bar', seriesLayoutBy: ${seriesLayoutBy} },
    // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
  ],
}}
}</pre>`,
              }}
            />
          </Panel>
          <Panel header="4.filter transform" key="4" showArrow={false}>
            <div>
              <div>第二张图：</div>
              <span>fromDatasetIndex：</span>
              <Select
                defaultValue={1}
                style={{ width: 100 }}
                onChange={value =>
                  setState(config => {
                    config.fromDatasetIndex = value;
                  })
                }
                options={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                ]}
              />
              <div className={styles.marginTop}>
                <span>transform.type：</span>
                <Select
                  defaultValue="filter"
                  style={{ width: 100 }}
                  onChange={value => {
                    setState(config => {
                      config.transformType = value;
                      config.dimensionFilter =
                        value === 'filter' ? '>' : 'order';
                      config.dimensionValue =
                        value === 'filter' ? INITIAL_VALUE : 'desc';
                    });
                  }}
                  options={[
                    { label: 'filter', value: 'filter' },
                    { label: 'sort', value: 'sort' },
                  ]}
                />
              </div>
              <div className={styles.marginTop}>
                <span>dimension：</span>
                <Select
                  defaultValue="Sales"
                  style={{ width: 100 }}
                  onChange={value =>
                    setState(config => {
                      config.dimension = value;
                    })
                  }
                  options={[
                    { label: 'Product', value: 'Product' },
                    { label: 'Sales', value: 'Sales' },
                    { label: 'Price', value: 'Price' },
                    { label: 'Year', value: 'Year' },
                  ]}
                />
              </div>
              {transformType === 'filter' && (
                <>
                  <div className={styles.marginTop}>
                    <span>dimensionFilter：</span>
                    <Select
                      defaultValue=">"
                      style={{ width: 100 }}
                      onChange={(value: string) => {
                        setState(config => {
                          config.dimensionFilter = value;
                        });
                        if (transformType === 'filter') {
                          if (value === 'reg') {
                            setState(config => {
                              config.dimensionValue = '//';
                            });
                          } else {
                            setState(config => {
                              config.dimensionValue = INITIAL_VALUE;
                            });
                          }
                        }
                      }}
                      options={[
                        { label: '>', value: '>' },
                        { label: '>=', value: '>=' },
                        { label: '=', value: '=' },
                        { label: '!=', value: '!=' },
                        { label: '<=', value: '<=' },
                        { label: '<', value: '<' },
                        { label: 'reg', value: 'reg' },
                      ]}
                    />
                  </div>
                  <div className={styles.marginTop}>
                    <span>dimensionValue：</span>
                    <Input
                      style={{ width: 100 }}
                      value={dimensionValue}
                      onChange={e => {
                        e.persist();
                        try {
                          if (transformType === 'filter') {
                            if (dimensionFilter === 'reg') {
                              eval('' + dimensionValue);
                              setState(config => {
                                config.dimensionValue = e.target.value;
                              });
                            } else {
                              setState(config => {
                                config.dimensionValue = +e.target.value;
                              });
                            }
                          } else {
                            setState(config => {
                              config.dimensionValue = e.target.value;
                            });
                          }
                        } catch (err) {
                          message.error(err.message);
                        }
                      }}
                    />
                  </div>
                </>
              )}
              {transformType === 'sort' && (
                <div className={styles.marginTop}>
                  <span>order：</span>
                  <Select
                    defaultValue="desc"
                    style={{ width: 100 }}
                    onChange={value =>
                      setState(config => {
                        config.dimensionValue = value;
                      })
                    }
                    options={[
                      { label: 'desc', value: 'desc' },
                      { label: 'asc', value: 'asc' },
                    ]}
                  />
                </div>
              )}
            </div>
            <div
              className={styles.marginTop}
              dangerouslySetInnerHTML={{
                __html: `<pre>option = {
  dataset: [
    {
      // 这个 dataset 的 index 是 0。
      source: [
        ['Product', 'Sales', 'Price', 'Year'],
        ['Cake', 123, 32, 2011],
        ['Cereal', 231, 14, 2011],
        ['Tofu', 235, 5, 2011],
        ['Dumpling', 341, 25, 2011],
        ['Biscuit', 122, 29, 2011],
        ['Cake', 143, 30, 2012],
        ['Cereal', 201, 19, 2012],
        ['Tofu', 255, 7, 2012],
        ['Dumpling', 241, 27, 2012],
        ['Biscuit', 102, 34, 2012],
      ],
    },
    {
      id: 'test',
      // 这个 dataset 的 index 是 1。
      transform: {
        type: 'filter',
        config: { dimension: 'Year', '=': 2011 },
      },
      // 我们还可以设置这些可选的属性： 
      // 'fromDatasetIndex' 或 'fromDatasetId'。
    },
    {
      // 这个 dataset 的 index 是 2。
      // 否则将默认输入来自于 index 为 0 的 dataset 。
      fromDatasetIndex: ${fromDatasetIndex},
      transform: {
        type: '${transformType}',
        config: { dimension: '${dimension}', '${dimensionFilter}': ${dimensionValue} },
      },
    },
  ],
  series: [
    {
      type: 'pie',
      radius: 50,
      center: ['30%', '50%'],
      datasetIndex: 1,
    },
    {
      type: 'pie',
      radius: 50,
      center: ['70%', '50%'],
      datasetIndex: 2,
    },
  ],
}</pre>`,
              }}
            />
          </Panel>
          <Panel header="5.encode 映射" key="5" showArrow={false}>
            <div className={styles.marginTop}>
              <span>encode.x：</span>
              <Select
                defaultValue="score"
                style={{ width: 200 }}
                onChange={(value: string) => {
                  if (value === 'product' && encodeY === 'product') {
                    message.error('不可以同时设置为 category 类型!');
                    return;
                  }
                  setState(config => {
                    config.encodeX = value;
                  });
                }}
                options={[
                  { label: 'score', value: 'score' },
                  { label: 'amount', value: 'amount' },
                  { label: 'product', value: 'product' },
                ]}
              />
            </div>
            <div className={styles.marginTop}>
              <span>encode.y：</span>
              <Select
                defaultValue="product"
                style={{ width: 200 }}
                onChange={(value: string) => {
                  if (value === 'product' && encodeX === 'product') {
                    message.error('不可以同时设置为 category 类型!');
                    return;
                  }
                  setState(config => {
                    config.encodeY = value;
                  });
                }}
                options={[
                  { label: 'score', value: 'score' },
                  { label: 'amount', value: 'amount' },
                  { label: 'product', value: 'product' },
                ]}
              />
            </div>
            <div className={styles.marginTop}>
              <span>tooltip：</span>
              <Select
                defaultValue={[]}
                style={{ width: 260 }}
                onChange={value =>
                  setState(config => {
                    config.tooltip = value;
                  })
                }
                options={[
                  { label: 'score', value: 'score' },
                  { label: 'amount', value: 'amount' },
                  { label: 'product', value: 'product' },
                ]}
                mode="multiple"
              />
            </div>

            <div
              className={styles.marginTop}
              dangerouslySetInnerHTML={{
                __html: `<pre>option = {
  dataset: {
    source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Latte'],
        [57.1, 78254, 'Tea'],
        [74.4, 41032, 'Cocoa'],
        [50.1, 12755, 'Cheese'],
        [89.7, 20145, 'Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange'],
        [10.6, 101852, 'Lemon'],
        [32.7, 20112, 'Brownie']
    ]
  },
  xAxis: { type: ${encodeX === 'product' ? 'category' : 'value'} },
  yAxis: { type: ${encodeY === 'product' ? 'category' : 'value'} },
  series: [
      {
          type: 'bar',
          encode: {
              x: ${encodeX},
              y: ${encodeY},
              tooltip: [${tooltip}],
          }
      }
  ],
  tooltip: {},
  grid: {
    left: '16%',
  },
}</pre>`,
              }}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
