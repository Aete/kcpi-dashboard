import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chart from '../organisms/Chart';
import HomeHeader from '../organisms/HomeHeader';
import { DefaultTemplate } from '../templates/DefaultTemplate';

export default function Home() {
  return (
    <DefaultTemplate>
      <HomeHeader />
      <Chart />
    </DefaultTemplate>
  );
}
