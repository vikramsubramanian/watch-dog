import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {
  Header,
  Container,
  Menu,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';

import './App.css';
import {strEqual} from './utility';
import {dateNumOptions} from './constants';

import Question from './Question';

function App () {
  const [crimeData, setCrimeData] = useState ([]);
  const [chartData, setChartData] = useState ({});
  const [dateType, setDateType] = useState ('year');

  const createLineChart = () => {
    var labels = [];
    var data = [];
    if (strEqual (dateType, 'year')) {
      for (var i = 1; i <= 12; i++) {
        var monthCount = crimeData.filter (crime => crime.OccuredMonth == i)
          .length;
        labels.push (dateNumOptions['month'][i - 1].label);
        data.push (monthCount);
      }
    } else if (strEqual (dateType, 'month')) {
      for (var i = 1; i <= 31; i++) {
        var dayCount = crimeData.filter (crime => crime.OccuredDay == i).length;
        labels.push (i);
        data.push (dayCount);
      }
    }
    setChartData ({
      labels: labels,
      datasets: [
        {
          label: 'Number of crimes reported',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderWidth: 4,
        },
      ],
    });
  };

  function selectCrime (crimeIndicator, dateType, dateNum) {
    var path = '/crime-events?';
    path += '&dateType=' + dateType + '&dateNum=' + dateNum.value;
    if (!strEqual (crimeIndicator, 'all')) {
      path += '&MCI=' + crimeIndicator;
    }
    fetch (path).then (response => response.json ()).then (data => {
      console.log (data);
      setDateType (dateType);
      setCrimeData (data);
    });
  }

  useEffect (
    () => {
      createLineChart ();
    },
    [crimeData]
  );

  useEffect (() => {
    // chart ();
  }, []);

  return (
    <div className="container">
      <div className="appHeader">
        <Header>
          <Icon name="plug" />
          <Header.Content>WatchDog</Header.Content>
        </Header>
      </div>
      <Question selectCrime={selectCrime} />
      <Container style={{marginTop: '3em'}}>
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: {text: '', display: true},
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoskip: true,
                      maxTicksLimits: 10,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat posuere tortor ut hendrerit. Praesent vehicula ex convallis hendrerit scelerisque. Morbi sed dui ac eros sollicitudin tempus at nec lacus. Fusce euismod turpis sit amet purus maximus sollicitudin. Aliquam dictum, ante sit amet egestas vestibulum, lacus tellus molestie turpis, sit amet tempus ex nunc nec ante. Quisque id enim diam. Pellentesque tincidunt, ligula in condimentum convallis, augue libero feugiat urna, ac mollis ante massa in odio. In lorem orci, rutrum vitae ornare a, tincidunt id enim. Integer fermentum vel quam vitae pretium. Nunc erat diam, luctus eget nulla non, mollis dapibus diam.

          Nulla facilisi. In finibus tortor nec nunc viverra, sit amet pulvinar lectus faucibus. Ut imperdiet ex non euismod mattis. Nulla quis dui urna. Nam mattis felis tempor orci malesuada tempus. Donec sed vestibulum mauris. Phasellus convallis placerat commodo. Maecenas nec egestas lorem, rutrum consectetur nisl. Nunc maximus aliquam risus, ut dapibus massa accumsan ac. Maecenas rutrum tellus ac mi porta, eget porta diam maximus. Praesent vel massa id arcu dapibus luctus nec ut orci. Vestibulum id aliquet eros, in congue nisi.

          Suspendisse eu luctus ex. Ut varius tellus vitae massa vestibulum rutrum. Pellentesque eros ipsum, tristique condimentum tempus vitae, ornare ut sapien. Nulla posuere felis et arcu feugiat egestas. Integer quam massa, pharetra ac varius nec, mattis vel elit. Duis eleifend lorem lectus, eu maximus neque sagittis consequat. Suspendisse potenti. In hac habitasse platea dictumst. Pellentesque diam ipsum, iaculis nec augue ac, accumsan molestie lacus. Curabitur luctus dolor non sodales tempus. Aenean scelerisque, nulla eu aliquet tincidunt, quam arcu tempor quam, et interdum lacus augue vitae ligula. Ut ac velit quis quam molestie convallis eu nec augue. Nam ac tellus a nisl consequat lobortis ut ut libero. Nam pellentesque lorem in nisl molestie, ac semper neque gravida. Nam quis euismod felis. Vestibulum quis felis ac est bibendum bibendum.

          Nullam tincidunt vestibulum viverra. Etiam aliquet nulla ante, sit amet aliquet eros vestibulum in. Etiam aliquam lorem nec turpis suscipit, in fringilla ex ultricies. Etiam imperdiet, sapien vitae auctor gravida, lorem elit tincidunt odio, vitae iaculis felis dolor ut ante. Morbi pretium tortor quis velit ultrices pellentesque. Donec eu tellus semper, ultrices neque vitae, scelerisque mi. Quisque ultrices vulputate arcu, a congue est ornare ultricies. Fusce a luctus dolor. In hendrerit odio non lacinia consectetur. Curabitur non erat sagittis, consectetur nunc in, iaculis magna. Aliquam erat volutpat.

          Maecenas non nisl sed turpis facilisis ultricies nec sed mauris. Duis pulvinar sit amet ex vitae tempor. Nunc vulputate sapien at turpis mollis lobortis. Phasellus luctus ex nec risus feugiat efficitur. Aliquam lacinia nisl in metus egestas, in malesuada nulla vestibulum. Nulla porttitor elit massa, ac aliquet elit fermentum vel. Maecenas accumsan a tortor eget luctus. Sed augue purus, venenatis vel dapibus in, imperdiet sed nibh. Etiam lectus sapien, commodo faucibus scelerisque vitae, aliquam vel sapien. Nam molestie tempor sem a ullamcorper.

          Nulla condimentum ornare suscipit. Proin ac luctus libero. Sed pellentesque pharetra ante sed ullamcorper. In euismod nisl vitae risus porttitor, sed placerat mauris congue. Phasellus at ipsum eu eros ullamcorper luctus vitae ut ligula. Integer in eleifend dui. Pellentesque sit amet dapibus felis. Curabitur augue libero, ultrices ac commodo vel, volutpat quis massa. Vivamus eleifend, lectus a faucibus finibus, dui odio molestie purus, eget vestibulum metus ligula quis dolor. Nam volutpat urna et erat commodo euismod. Vivamus eget nibh consectetur, sodales diam sit amet, lacinia diam. In ultrices, purus id eleifend semper, tellus velit hendrerit risus, in interdum massa orci vitae sem. Pellentesque risus tortor, facilisis ac volutpat ac, tincidunt in augue. Phasellus nunc purus, sollicitudin eget dolor ac, porta iaculis felis. Fusce at fringilla leo.

          Interdum et malesuada fames ac ante ip
        </div>
      </Container>
    </div>
  );
}

export default App;
