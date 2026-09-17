import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, TrendingUp, TrendingDown, Target, Rocket,
  LineChart, Grid, Users, Star, ChevronDown,
  ShieldCheck, Zap, Activity, Home, Settings, Calendar, Check, CheckCircle2,
  Award, Sparkles, Clock, CheckCircle, RefreshCw, ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profilePic from '../assets/profile_img2.jpeg';
import googleAdsImg from '../assets/google_ads_img.jpeg';
import faviconImg from '../assets/febicon_img.jpeg';

// Client brand logos for genuine social proof avatars
import logoAG from '../assets/ag.jpeg';
import logoAO from '../assets/ao.jpeg';
import logoAT from '../assets/at.jpeg';
import logoHI from '../assets/hi.jpeg';
import logoTH from '../assets/th.jpeg';

// Interactive Date Ranges Dataset with Milestone Nodes
const dateRanges = [
  {
    id: '7D',
    label: 'Last 7 Days',
    shortLabel: '7D',
    badge: '+18.4% ROAS',
    clicks: '12.6K',
    clicksGrowth: '↑ 28.5%',
    conversions: '1.46K',
    conversionsGrowth: '↑ 32.1%',
    cpa: '$6.23',
    cpaGrowth: '↓ 14.3%',
    convValue: '$45.2K',
    convValueGrowth: '↑ 35.7%',
    clicksLine: 'M0,65 Q20,62 45,50 T95,38 T150,32 T210,24 T270,16 T320,8',
    clicksArea: '0,65 20,62 45,50 70,55 95,38 120,44 150,32 180,36 210,24 240,28 270,16 295,20 320,8 320,100 0,100',
    convLine: 'M0,85 Q20,80 45,86 T95,78 T150,68 T210,56 T270,45 T320,38',
    convArea: '0,85 20,80 45,86 70,72 95,78 120,65 150,68 180,52 210,56 240,42 270,45 295,30 320,38 320,100 0,100',
    peakX: 310,
    peakY: 8,
    dates: ['Day 1', 'Day 2', 'Day 4', 'Day 6', 'Day 7'],
    nodes: [
      { x: 10, y: 65, y2: 85, l: 'Day 1', v1: '1.8K', v2: '180' },
      { x: 80, y: 44, y2: 78, l: 'Day 2', v1: '4.2K', v2: '460' },
      { x: 155, y: 32, y2: 68, l: 'Day 4', v1: '7.6K', v2: '890' },
      { x: 235, y: 20, y2: 52, l: 'Day 6', v1: '10.5K', v2: '1.24K' },
      { x: 310, y: 8, y2: 38, l: 'Day 7', v1: '12.6K', v2: '1.46K' },
    ],
    sparkClicks: 'M0,14 Q10,4 20,11 T40,6 T60,2',
    sparkConv: 'M0,15 Q15,6 28,12 T45,7 T60,3',
    sparkCpa: 'M0,5 Q15,14 30,8 T45,13 T60,16',
    sparkVal: 'M0,16 Q12,8 25,12 T48,6 T60,1',
    donut: { pmax: 55, search: 25, shopping: 20 },
  },
  {
    id: '30D',
    label: 'Last 30 Days',
    shortLabel: '30D',
    badge: '+21.5% ROAS',
    clicks: '48.2K',
    clicksGrowth: '↑ 34.2%',
    conversions: '5.82K',
    conversionsGrowth: '↑ 39.4%',
    cpa: '$5.80',
    cpaGrowth: '↓ 18.2%',
    convValue: '$184.6K',
    convValueGrowth: '↑ 42.1%',
    clicksLine: 'M0,75 Q25,60 55,42 T110,48 T165,30 T220,35 T275,18 T320,12',
    clicksArea: '0,75 25,60 55,42 85,52 110,48 140,36 165,30 195,38 220,35 250,22 275,18 300,16 320,12 320,100 0,100',
    convLine: 'M0,90 Q25,82 55,70 T110,72 T165,55 T220,58 T275,40 T320,32',
    convArea: '0,90 25,82 55,70 85,76 110,72 140,62 165,55 195,62 220,58 250,46 275,40 300,38 320,32 320,100 0,100',
    peakX: 310,
    peakY: 12,
    dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    nodes: [
      { x: 10, y: 75, y2: 90, l: 'Week 1', v1: '9.4K', v2: '1.12K' },
      { x: 80, y: 50, y2: 74, l: 'Week 2', v1: '21.5K', v2: '2.54K' },
      { x: 155, y: 32, y2: 58, l: 'Week 3', v1: '34.8K', v2: '4.15K' },
      { x: 235, y: 22, y2: 44, l: 'Week 4', v1: '42.1K', v2: '5.10K' },
      { x: 310, y: 12, y2: 32, l: 'Current', v1: '48.2K', v2: '5.82K' },
    ],
    sparkClicks: 'M0,16 Q15,8 30,12 T45,5 T60,2',
    sparkConv: 'M0,17 Q15,10 32,8 T48,4 T60,2',
    sparkCpa: 'M0,4 Q15,10 30,12 T48,15 T60,17',
    sparkVal: 'M0,17 Q14,9 28,10 T46,4 T60,1',
    donut: { pmax: 58, search: 28, shopping: 14 },
  },
  {
    id: '90D',
    label: 'Last 90 Days',
    shortLabel: '90D',
    badge: '+28.7% ROAS',
    clicks: '154K',
    clicksGrowth: '↑ 48.6%',
    conversions: '18.4K',
    conversionsGrowth: '↑ 52.8%',
    cpa: '$5.15',
    cpaGrowth: '↓ 24.5%',
    convValue: '$592K',
    convValueGrowth: '↑ 64.2%',
    clicksLine: 'M0,82 Q30,70 65,55 T130,45 T195,28 T260,18 T320,6',
    clicksArea: '0,82 30,70 65,55 95,60 130,45 160,35 195,28 230,24 260,18 290,12 320,6 320,100 0,100',
    convLine: 'M0,95 Q30,85 65,75 T130,65 T195,48 T260,36 T320,24',
    convArea: '0,95 30,85 65,75 95,80 130,65 160,56 195,48 230,42 260,36 290,28 320,24 320,100 0,100',
    peakX: 310,
    peakY: 6,
    dates: ['Month 1', 'Month 2', 'Month 2.5', 'Month 3', 'Current'],
    nodes: [
      { x: 10, y: 82, y2: 95, l: 'Month 1', v1: '35K', v2: '4.2K' },
      { x: 80, y: 58, y2: 78, l: 'Month 2', v1: '72K', v2: '8.6K' },
      { x: 155, y: 38, y2: 56, l: 'Month 2.5', v1: '108K', v2: '13.1K' },
      { x: 235, y: 20, y2: 40, l: 'Month 3', v1: '135K', v2: '16.4K' },
      { x: 310, y: 6, y2: 24, l: 'Current', v1: '154K', v2: '18.4K' },
    ],
    sparkClicks: 'M0,17 Q15,12 30,9 T45,4 T60,1',
    sparkConv: 'M0,18 Q16,12 32,8 T48,3 T60,1',
    sparkCpa: 'M0,3 Q16,8 32,12 T48,15 T60,18',
    sparkVal: 'M0,18 Q15,10 30,7 T48,3 T60,1',
    donut: { pmax: 62, search: 26, shopping: 12 },
  },
  {
    id: 'Year',
    label: 'All-Time Year',
    shortLabel: '1Y',
    badge: '+34.2% ROAS',
    clicks: '272K',
    clicksGrowth: '↑ 61.2%',
    conversions: '32.6K',
    conversionsGrowth: '↑ 68.9%',
    cpa: '$4.80',
    cpaGrowth: '↓ 29.8%',
    convValue: '$1.08M',
    convValueGrowth: '↑ 84.5%',
    clicksLine: 'M0,88 Q35,74 70,60 T140,38 T210,22 T280,10 T320,4',
    clicksArea: '0,88 35,74 70,60 105,50 140,38 175,28 210,22 245,15 280,10 300,6 320,4 320,100 0,100',
    convLine: 'M0,96 Q35,88 70,78 T140,56 T210,40 T280,26 T320,16',
    convArea: '0,96 35,88 70,78 105,68 140,56 175,46 210,40 245,32 280,26 300,20 320,16 320,100 0,100',
    peakX: 310,
    peakY: 4,
    dates: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
    nodes: [
      { x: 10, y: 88, y2: 96, l: 'Q1', v1: '45K', v2: '5.4K' },
      { x: 80, y: 56, y2: 74, l: 'Q2', v1: '110K', v2: '13.2K' },
      { x: 155, y: 32, y2: 50, l: 'Q3', v1: '175K', v2: '21.0K' },
      { x: 235, y: 16, y2: 32, l: 'Q4', v1: '235K', v2: '28.1K' },
      { x: 310, y: 4, y2: 16, l: 'Current', v1: '272K', v2: '32.6K' },
    ],
    sparkClicks: 'M0,18 Q16,14 32,9 T48,4 T60,1',
    sparkConv: 'M0,18 Q16,13 32,7 T48,3 T60,1',
    sparkCpa: 'M0,2 Q16,8 32,13 T48,16 T60,18',
    sparkVal: 'M0,18 Q15,9 30,6 T48,2 T60,1',
    donut: { pmax: 65, search: 24, shopping: 11 },
  }
];

// Interactive Dashboard Sidebar Tabs
const sidebarTabs = [
  { id: 'home', name: 'Overview', icon: Home },
  { id: 'analytics', name: 'ROAS & Profit', icon: LineChart },
  { id: 'campaigns', name: 'Campaign Mix', icon: Grid },
  { id: 'target', name: 'CPA & Conv.', icon: Target },
  { id: 'users', name: 'Audiences & LTV', icon: Users },
];

const tabConfigs = {
  home: {
    id: 'home',
    title: 'Google Ads Performance',
    badge: 'Live Overview',
    legend1: 'Clicks Trend',
    legend2: 'Conversions',
    yAxis: ['1.5K', '1K', '500', '0'],
    statusBadge: 'Scale Trend',
    getMetrics: (data) => [
      {
        icon: LineChart,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/70 to-white',
        border: 'border-emerald-100',
        label: 'Clicks',
        value: data.clicks,
        growth: data.clicksGrowth,
        growthColor: 'text-emerald-600',
        spark: data.sparkClicks,
        sparkStroke: '#059669',
      },
      {
        icon: TrendingUp,
        iconColor: 'text-teal-600',
        bgGradient: 'from-teal-50/70 to-white',
        border: 'border-teal-100',
        label: 'Conversions',
        value: data.conversions,
        growth: data.conversionsGrowth,
        growthColor: 'text-teal-600',
        spark: data.sparkConv,
        sparkStroke: '#0D9488',
      },
      {
        icon: Target,
        iconColor: 'text-amber-500',
        bgGradient: 'from-amber-50/40 to-white',
        border: 'border-amber-100/70',
        label: 'Cost / Conv.',
        value: data.cpa,
        growth: data.cpaGrowth,
        growthColor: 'text-emerald-600',
        spark: data.sparkCpa,
        sparkStroke: '#F59E0B',
      },
      {
        icon: Zap,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/80 to-teal-50/50',
        border: 'border-emerald-200',
        label: 'Conv. Value',
        value: data.convValue,
        growth: data.convValueGrowth,
        growthColor: 'text-emerald-600',
        spark: data.sparkVal,
        sparkStroke: '#10B981',
      },
    ],
    getGraph: (data) => ({
      line1: data.clicksLine,
      area1: data.clicksArea,
      color1: '#059669',
      fill1: 'url(#emeraldHeroFill)',
      strokeWidth1: '2.8',
      line2: data.convLine,
      area2: data.convArea,
      color2: '#0D9488',
      fill2: 'url(#tealHeroFill)',
      strokeWidth2: '2',
      peakX: data.peakX,
      peakY: data.peakY,
    }),
  },
  analytics: {
    id: 'analytics',
    title: 'ROAS & Revenue Analytics',
    badge: 'Profit Focus',
    legend1: 'Net Revenue',
    legend2: 'Target ROAS',
    yAxis: ['6.0x', '4.0x', '2.0x', '1.0x'],
    statusBadge: 'Profit Max',
    getMetrics: (data) => {
      const roasMap = { '7D': '4.12x', '30D': '4.85x', '90D': '5.20x', 'Year': '5.64x' };
      const spendMap = { '7D': '$9.8K', '30D': '$38.2K', '90D': '$114K', 'Year': '$218K' };
      const profitMap = { '7D': '64.2%', '30D': '68.5%', '90D': '71.2%', 'Year': '74.8%' };
      return [
        {
          icon: Zap,
          iconColor: 'text-emerald-600',
          bgGradient: 'from-emerald-50/70 to-white',
          border: 'border-emerald-200',
          label: 'Target ROAS',
          value: roasMap[data.id] || '4.85x',
          growth: data.badge,
          growthColor: 'text-emerald-600',
          spark: 'M0,17 Q15,8 30,12 T45,5 T60,2',
          sparkStroke: '#059669',
        },
        {
          icon: TrendingUp,
          iconColor: 'text-teal-600',
          bgGradient: 'from-teal-50/70 to-white',
          border: 'border-teal-100',
          label: 'Net Revenue',
          value: data.convValue,
          growth: data.convValueGrowth,
          growthColor: 'text-teal-600',
          spark: 'M0,16 Q15,10 32,8 T48,4 T60,2',
          sparkStroke: '#0D9488',
        },
        {
          icon: ShieldCheck,
          iconColor: 'text-blue-500',
          bgGradient: 'from-blue-50/40 to-white',
          border: 'border-blue-100',
          label: 'Profit Margin',
          value: profitMap[data.id] || '68.5%',
          growth: '↑ 14.8% net',
          growthColor: 'text-blue-600',
          spark: 'M0,15 Q15,11 30,7 T48,4 T60,1',
          sparkStroke: '#3B82F6',
        },
        {
          icon: LineChart,
          iconColor: 'text-indigo-600',
          bgGradient: 'from-indigo-50/50 to-white',
          border: 'border-indigo-100',
          label: 'Ad Spend',
          value: spendMap[data.id] || '$38.2K',
          growth: 'Optimized Pace',
          growthColor: 'text-indigo-600',
          spark: 'M0,8 Q15,12 30,9 T48,14 T60,16',
          sparkStroke: '#6366F1',
        },
      ];
    },
    getGraph: (data) => ({
      line1: 'M0,72 Q25,55 60,40 T120,32 T180,22 T240,14 T320,6',
      area1: '0,72 25,55 60,40 90,46 120,32 150,30 180,22 210,24 240,14 280,10 320,6 320,100 0,100',
      color1: '#059669',
      fill1: 'url(#emeraldHeroFill)',
      strokeWidth1: '2.8',
      line2: 'M0,86 Q25,78 60,65 T120,54 T180,44 T240,32 T320,20',
      area2: '0,86 25,78 60,65 90,70 120,54 150,56 180,44 210,48 240,32 280,26 320,20 320,100 0,100',
      color2: '#0284C7',
      fill2: 'url(#blueHeroFill)',
      strokeWidth2: '2',
      peakX: 320,
      peakY: 6,
    }),
  },
  campaigns: {
    id: 'campaigns',
    title: 'Campaign Mix & Scaling',
    badge: 'Multi-Channel',
    legend1: 'Performance Max',
    legend2: 'Search & Shopping',
    yAxis: ['100%', '75%', '50%', '25%'],
    statusBadge: 'Channel Max',
    getMetrics: (data) => [
      {
        icon: Grid,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/70 to-white',
        border: 'border-emerald-100',
        label: 'PMax Share',
        value: `${data.donut.pmax}%`,
        growth: '↑ Primary Scale',
        growthColor: 'text-emerald-600',
        spark: 'M0,16 Q15,7 30,10 T45,4 T60,1',
        sparkStroke: '#059669',
      },
      {
        icon: Rocket,
        iconColor: 'text-teal-600',
        bgGradient: 'from-teal-50/70 to-white',
        border: 'border-teal-100',
        label: 'Search ROAS',
        value: '5.42x',
        growth: '↑ 26.4% Intent',
        growthColor: 'text-teal-600',
        spark: 'M0,17 Q15,10 32,8 T48,4 T60,2',
        sparkStroke: '#0D9488',
      },
      {
        icon: Target,
        iconColor: 'text-amber-500',
        bgGradient: 'from-amber-50/40 to-white',
        border: 'border-amber-100',
        label: 'Shopping CPA',
        value: '$4.20',
        growth: '↓ 31.8% Cheaper',
        growthColor: 'text-emerald-600',
        spark: 'M0,4 Q15,10 30,12 T48,15 T60,17',
        sparkStroke: '#F59E0B',
      },
      {
        icon: Activity,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/80 to-teal-50/50',
        border: 'border-emerald-200',
        label: 'Active SKUs',
        value: '1,420+',
        growth: 'Top Tier Priority',
        growthColor: 'text-emerald-600',
        spark: 'M0,18 Q15,9 30,6 T48,2 T60,1',
        sparkStroke: '#10B981',
      },
    ],
    getGraph: (data) => ({
      line1: 'M0,80 Q30,68 65,50 T130,36 T195,24 T260,14 T320,5',
      area1: '0,80 30,68 65,50 95,56 130,36 160,32 195,24 230,22 260,14 290,10 320,5 320,100 0,100',
      color1: '#059669',
      fill1: 'url(#emeraldHeroFill)',
      strokeWidth1: '2.8',
      line2: 'M0,88 Q30,80 65,72 T130,60 T195,50 T260,42 T320,34',
      area2: '0,88 30,80 65,72 95,78 130,60 160,58 195,50 230,48 260,42 290,38 320,34 320,100 0,100',
      color2: '#0D9488',
      fill2: 'url(#tealHeroFill)',
      strokeWidth2: '2',
      peakX: 310,
      peakY: 5,
    }),
  },
  target: {
    id: 'target',
    title: 'CPA Reduction & Conversion Engine',
    badge: 'Efficiency Boost',
    legend1: 'Conv. Rate %',
    legend2: 'CPA Drop ($)',
    yAxis: ['6.0%', '4.5%', '3.0%', '1.5%'],
    statusBadge: 'Efficiency Boost',
    getMetrics: (data) => [
      {
        icon: Target,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/70 to-white',
        border: 'border-emerald-100',
        label: 'Conv. Rate',
        value: '4.85%',
        growth: '↑ +48.2% boost',
        growthColor: 'text-emerald-600',
        spark: 'M0,17 Q15,11 30,8 T45,4 T60,1',
        sparkStroke: '#059669',
      },
      {
        icon: TrendingDown,
        iconColor: 'text-teal-600',
        bgGradient: 'from-teal-50/70 to-white',
        border: 'border-teal-100',
        label: 'Blended CPA',
        value: data.cpa,
        growth: data.cpaGrowth,
        growthColor: 'text-emerald-600',
        spark: data.sparkCpa,
        sparkStroke: '#0D9488',
      },
      {
        icon: CheckCircle2,
        iconColor: 'text-blue-500',
        bgGradient: 'from-blue-50/40 to-white',
        border: 'border-blue-100',
        label: 'Cart-to-Order',
        value: '21.4%',
        growth: '↑ 18.6% checkout',
        growthColor: 'text-blue-600',
        spark: 'M0,16 Q15,10 32,7 T48,3 T60,1',
        sparkStroke: '#3B82F6',
      },
      {
        icon: ShieldCheck,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/80 to-teal-50/50',
        border: 'border-emerald-200',
        label: 'Quality Score',
        value: '9.4 / 10',
        growth: 'Lowest CPC tier',
        growthColor: 'text-emerald-600',
        spark: 'M0,17 Q15,8 30,12 T45,5 T60,2',
        sparkStroke: '#10B981',
      },
    ],
    getGraph: (data) => ({
      line1: 'M0,82 Q25,66 60,48 T120,38 T180,26 T240,16 T320,6',
      area1: '0,82 25,66 60,48 90,52 120,38 150,34 180,26 210,22 240,16 280,12 320,6 320,100 0,100',
      color1: '#059669',
      fill1: 'url(#emeraldHeroFill)',
      strokeWidth1: '2.8',
      line2: 'M0,25 Q25,36 60,48 T120,58 T180,68 T240,78 T320,86',
      area2: '0,25 25,36 60,48 90,44 120,58 150,60 180,68 210,72 240,78 280,82 320,86 320,100 0,100',
      color2: '#F59E0B',
      fill2: 'url(#amberHeroFill)',
      strokeWidth2: '2',
      peakX: 310,
      peakY: 6,
    }),
  },
  users: {
    id: 'users',
    title: 'Audience Cohorts & Customer LTV',
    badge: 'Customer Retention',
    legend1: 'New Buyers',
    legend2: 'Repeat Buyers (LTV)',
    yAxis: ['80%', '60%', '40%', '20%'],
    statusBadge: 'High LTV',
    getMetrics: (data) => [
      {
        icon: Users,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/70 to-white',
        border: 'border-emerald-100',
        label: 'New Cust. Share',
        value: '74.5%',
        growth: '↑ Scaled Top-Funnel',
        growthColor: 'text-emerald-600',
        spark: 'M0,16 Q15,8 30,12 T45,5 T60,2',
        sparkStroke: '#059669',
      },
      {
        icon: TrendingUp,
        iconColor: 'text-teal-600',
        bgGradient: 'from-teal-50/70 to-white',
        border: 'border-teal-100',
        label: 'Repeat Buyers',
        value: '25.5%',
        growth: '↑ 54.2% LTV',
        growthColor: 'text-teal-600',
        spark: 'M0,17 Q15,10 32,8 T48,4 T60,2',
        sparkStroke: '#0D9488',
      },
      {
        icon: Zap,
        iconColor: 'text-blue-500',
        bgGradient: 'from-blue-50/40 to-white',
        border: 'border-blue-100',
        label: 'Avg Order Value',
        value: '$148.50',
        growth: '↑ +$32.00 uplift',
        growthColor: 'text-blue-600',
        spark: 'M0,16 Q15,10 32,7 T48,3 T60,1',
        sparkStroke: '#3B82F6',
      },
      {
        icon: Star,
        iconColor: 'text-amber-500',
        bgGradient: 'from-amber-50/40 to-white',
        border: 'border-amber-100',
        label: '90-Day LTV',
        value: '$386.00',
        growth: 'Compounding Value',
        growthColor: 'text-emerald-600',
        spark: 'M0,18 Q15,9 30,6 T48,2 T60,1',
        sparkStroke: '#F59E0B',
      },
    ],
    getGraph: (data) => ({
      line1: 'M0,78 Q25,62 60,46 T120,34 T180,24 T240,14 T320,4',
      area1: '0,78 25,62 60,46 90,50 120,34 150,30 180,24 210,20 240,14 280,8 320,4 320,100 0,100',
      color1: '#059669',
      fill1: 'url(#emeraldHeroFill)',
      strokeWidth1: '2.8',
      line2: 'M0,90 Q25,82 60,72 T120,60 T180,48 T240,36 T320,24',
      area2: '0,90 25,82 60,72 90,76 120,60 150,56 180,48 210,44 240,36 280,30 320,24 320,100 0,100',
      color2: '#0D9488',
      fill2: 'url(#tealHeroFill)',
      strokeWidth2: '2',
      peakX: 310,
      peakY: 4,
    }),
  },
};

// Helper to extract rich tooltip data for the hovered graph node
function getNodeDetails(activeTab, activeData, nodeIndex) {
  const node = activeData.nodes?.[nodeIndex];
  if (!node) return null;
  const tab = tabConfigs[activeTab] || tabConfigs.home;

  let val1 = node.v1;
  let val2 = node.v2;

  if (activeTab === 'analytics') {
    val1 = activeData.convValue;
    val2 = activeData.badge;
  } else if (activeTab === 'campaigns') {
    val1 = `${activeData.donut.pmax}% PMax`;
    val2 = `${activeData.donut.search}% Search`;
  } else if (activeTab === 'target') {
    val1 = '4.85% Conv.';
    val2 = activeData.cpa;
  } else if (activeTab === 'users') {
    val1 = '74.5% New';
    val2 = '25.5% Ret.';
  }

  return {
    label: node.l,
    val1,
    val2,
    legend1: tab.legend1,
    legend2: tab.legend2,
    badge: activeData.badge,
  };
}

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  // Hero section right-column 3-state view: 'graph' | 'profile' | 'profit'
  const [heroMode, setHeroMode] = useState('graph');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(1); // Default to Last 30 Days
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState(null);
  const [cursorX, setCursorX] = useState(null);
  const [isHoveringGraph, setIsHoveringGraph] = useState(false);
  const dropdownRef = useRef(null);

  // Cycle through: graph -> profile -> profit -> graph
  const cycleHeroMode = () => {
    setHeroMode((prev) => {
      if (prev === 'graph') return 'profile';
      if (prev === 'profile') return 'profit';
      return 'graph';
    });
  };

  const activeData = dateRanges[selectedRangeIndex];
  const currentTabConfig = tabConfigs[activeTab] || tabConfigs.home;
  const currentMetrics = currentTabConfig.getMetrics(activeData);
  const currentGraph = currentTabConfig.getGraph(activeData);

  const hoveredNodeData = hoveredNodeIndex !== null ? getNodeDetails(activeTab, activeData, hoveredNodeIndex) : null;

  const handleGraphMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = x / rect.width;
    const svgX = ratio * 320;
    setCursorX(svgX);
    setIsHoveringGraph(true);

    const nodes = activeData.nodes || [];
    if (nodes.length > 0) {
      let closestIdx = 0;
      let minDist = Infinity;
      nodes.forEach((n, idx) => {
        const dist = Math.abs(n.x - svgX);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      setHoveredNodeIndex(closestIdx);
    }
  };

  const handleGraphMouseLeave = () => {
    setIsHoveringGraph(false);
    setHoveredNodeIndex(null);
    setCursorX(null);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Floating micro-animations
  const floatSlow = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const floatReverse = {
    animate: {
      y: [0, 9, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
    }
  };

  const floatBadge = {
    animate: {
      y: [0, -8, 0],
      rotate: [-1.2, 1.2, -1.2],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-gradient-to-b from-white via-[#F6FAF8] to-[#EEF7F3] min-h-[calc(100vh-20px)] flex flex-col justify-center select-none"
    >
      {/* ─── Multi-Layered Luminous Ambient Meshes & Auroras ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main top right emerald aurora */}
        <div
          className="absolute -top-24 right-10 w-[700px] h-[700px] rounded-full opacity-40 pointer-events-none filter blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(20, 184, 166, 0.12) 40%, transparent 70%)' }}
        />
        {/* Soft cyan & indigo center glow behind dashboard */}
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none filter blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)' }}
        />
        {/* Left emerald ambient light */}
        <div
          className="absolute -top-10 -left-20 w-[550px] h-[550px] rounded-full opacity-30 pointer-events-none filter blur-[85px]"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.06) 50%, transparent 70%)' }}
        />
        {/* Bottom teal-sky soft spotlight */}
        <div
          className="absolute bottom-0 right-1/3 w-[600px] h-[300px] rounded-full opacity-25 pointer-events-none filter blur-[70px]"
          style={{ background: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.18) 0%, transparent 70%)' }}
        />
      </div>

      {/* Subtle Matrix Dot Grid with Radial Fade */}
      <div
        className="absolute inset-0 opacity-[0.038] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)'
        }}
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ═════════════════════════════════════════════════════
              LEFT COLUMN: High-Converting Headline, Social Proof, CTAs
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-5 text-left">

            {/* Author / Identity Luxury Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill-luxury border border-emerald-300/60 shadow-soft-sm hover:border-emerald-400 transition-all cursor-default"
            >
              <div className="w-5 h-5 rounded-md overflow-hidden bg-white flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs">
                <img
                  src={faviconImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wide flex items-center gap-1.5">
                <span className="text-emerald-700 font-extrabold">{personalInfo.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-semibold">Google Ads Specialist</span>
              </span>
              <span className="relative flex h-2 w-2 ml-0.5" title="Available for projects">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="hidden sm:inline-flex text-[9.5px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200/70">
                Q3 Open
              </span>
            </motion.div>

            {/* Main Bold Headline with Website Emerald Theme & Hand-drawn Curve */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-slate-900 tracking-tight leading-[1.18] pb-1"
            >
              More Clicks.
              <br />
              Better Conversions.
              <br />
              <span className="relative inline-block mt-0.5">
                <span className="animated-growth-gradient font-black">
                  Maximum Growth.
                </span>
                {/* Hand-drawn Accent curve with vibrant glowing gradient */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 pointer-events-none overflow-visible"
                  viewBox="0 0 260 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="curveWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="30%" stopColor="#10B981" />
                      <stop offset="70%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M3 9C65 2 195 2 257 8"
                    stroke="url(#curveWaveGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle with High-Impact Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg"
            >
              I help e-commerce & DTC brands scale predictably with data-driven Google Ads architectures, Performance Max scaling, and negative keyword precision that lower CPA and maximize ROAS.
            </motion.p>

            {/* ─── NEW: Social Proof Trust Strip with Real Brand Badges ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex items-center gap-3 pt-0.5"
            >
              {/* Overlapping Client Brand Avatars with crisp badge styling */}
              <div className="flex items-center -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-soft-sm overflow-hidden bg-white flex items-center justify-center p-1 hover:scale-110 hover:z-10 transition-transform">
                  <img src={logoAG} alt="Client Brand" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-soft-sm overflow-hidden bg-white flex items-center justify-center p-1 hover:scale-110 hover:z-10 transition-transform">
                  <img src={logoAO} alt="Client Brand" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-soft-sm overflow-hidden bg-white flex items-center justify-center p-1 hover:scale-110 hover:z-10 transition-transform">
                  <img src={logoAT} alt="Client Brand" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-soft-sm overflow-hidden bg-white flex items-center justify-center p-1 hover:scale-110 hover:z-10 transition-transform">
                  <img src={logoHI} alt="Client Brand" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-soft-sm overflow-hidden bg-white flex items-center justify-center p-1 hover:scale-110 hover:z-10 transition-transform">
                  <img src={logoTH} alt="Client Brand" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Rating & Credibility Text */}
              <div className="text-left leading-tight">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span className="text-xs font-black text-slate-800 ml-1">4.9/5</span>
                  <span className="text-[11px] font-semibold text-slate-500">• 50+ Brands</span>
                </div>
                <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                  $15M+ Profitable Spend Managed
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons with Glowing Aura and Shimmer Effect */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-2 pt-1"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
                <button
                  onClick={onBookCall}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm sm:text-base button-glow-emerald transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 button-shine relative overflow-hidden group"
                >
                  <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Get Free Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#case-studies"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/90 hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-soft-sm hover:border-emerald-300 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <LineChart className="w-4 h-4 text-emerald-600" />
                  <span>View Case Studies</span>
                </a>
              </div>

              {/* Confidence Micro-Copy */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Free 30-Min Growth Audit
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> 48h Turnaround
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero Lock-In
                </span>
              </div>
            </motion.div>

            {/* 3 Pillars / Frosted Feature Micro-Cards */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-3 border-t border-slate-200/80"
            >
              <div className="flex items-center sm:items-start gap-2.5 p-2 rounded-xl bg-white/60 hover:bg-white/95 border border-slate-200/60 hover:border-emerald-200/80 shadow-xs hover:shadow-soft-sm transition-all group backdrop-blur-xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-100 transition-all shadow-xs">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Target Right</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">High-intent search & PMax</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-2.5 p-2 rounded-xl bg-white/60 hover:bg-white/95 border border-slate-200/60 hover:border-teal-200/80 shadow-xs hover:shadow-soft-sm transition-all group backdrop-blur-xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-100 transition-all shadow-xs">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Cut CPA Waste</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">-34% lower acquisition cost</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-2.5 p-2 rounded-xl bg-white/60 hover:bg-white/95 border border-slate-200/60 hover:border-sky-200/80 shadow-xs hover:shadow-soft-sm transition-all group backdrop-blur-xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-sky-100 transition-all shadow-xs">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Scale Profit</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">3.4x - 6.8x avg ROAS</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ═════════════════════════════════════════════════════
              RIGHT COLUMN: Next-Gen Ad-Tech Perspective Dashboard
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center pb-12 sm:pb-14 lg:pb-10">

            {/* Ambient Optical Halo Behind Dashboard */}
            <div className="dashboard-halo" />

            {/* ─── Interactive 3-State View Switcher Control Bar (Graph / Profile / Profit Arrow) ─── */}
            <div className="w-full max-w-[670px] flex items-center justify-between gap-2 mb-3.5 z-30">
              {/* Segmented View Mode Tabs */}
              <div className="flex items-center p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs">
                {[
                  { id: 'graph', label: 'Live Graph', icon: LineChart },
                  { id: 'profile', label: 'My Profile', icon: Users },
                  { id: 'profit', label: 'Profit Arrow', icon: TrendingUp },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = heroMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setHeroMode(tab.id)}
                      className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                        isActive ? 'text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="heroActiveViewPill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-500/30"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span className="text-[11px] sm:text-xs">{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* High-Impact 1-Click Interactive Cycle Switcher Button */}
              <button
                onClick={cycleHeroMode}
                title="Click to cycle to next view"
                className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-2xl bg-slate-900 hover:bg-emerald-950 text-white text-xs font-bold border border-slate-700/80 hover:border-emerald-400/80 shadow-md transition-all cursor-pointer select-none"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
                <span className="text-[10.5px] sm:text-xs">
                  {heroMode === 'graph' ? 'Switch to Profile →' : heroMode === 'profile' ? 'Switch to Profit Arrow →' : 'Switch to Graph →'}
                </span>
              </button>
            </div>

            {/* ─── 3-State Morphing Container (Graph -> Profile -> Profit Arrow -> Graph) ─── */}
            <AnimatePresence mode="wait">
              {/* STATE 1: LIVE GRAPH DASHBOARD (DEFAULT VIEW) */}
              {heroMode === 'graph' && (
                <motion.div
                  key="hero-view-graph"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative w-full max-w-[670px] rounded-3xl bg-white shadow-2xl shadow-emerald-950/15 border border-slate-200/90 overflow-hidden flex flex-col transform lg:rotate-[-1.5deg] lg:hover:rotate-0 transition-transform duration-500"
                >
                  {/* ── macOS Style Luxury Window Header Bar ── */}
                  <div className="bg-[#0B132B] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
                    {/* Traffic light control dots */}
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
                    </div>

                    {/* Elegant Centered Window Title */}
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs" />
                      <span>Campaign Performance Dashboard</span>
                    </div>

                    {/* Quick Switch Button directly in Header */}
                    <button
                      onClick={cycleHeroMode}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                      title="Click to switch to Profile"
                    >
                      <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span>SYNCED • VIEW PROFILE →</span>
                    </button>
                  </div>

                  {/* ── Inner Body Split: Left Sidebar + Main Content ── */}
                  <div className="flex flex-1 min-w-0">

                    {/* ── Dark Left Sidebar (Deep Navy Slate with Emerald Active Highlights) ── */}
                    <div className="w-14 sm:w-16 bg-[#0E1726] text-slate-400 flex flex-col items-center py-4 justify-between shrink-0 border-r border-slate-800">
                      <div className="space-y-5 flex flex-col items-center">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center p-1.5 overflow-hidden group hover:scale-105 transition-transform">
                          <img
                            src={googleAdsImg}
                            alt="Google Ads"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="space-y-2.5 flex flex-col items-center">
                          {sidebarTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
                                  isActive
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-400/40 scale-105'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                                }`}
                                aria-label={tab.name}
                              >
                                <Icon className="w-4 h-4" />
                                {/* Tooltip on hover */}
                                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-slate-700 hidden sm:block">
                                  {tab.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('home');
                          setSelectedRangeIndex(1);
                        }}
                        title="Reset to Default Overview"
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer relative group"
                        aria-label="Reset to Default"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-slate-700 hidden sm:block">
                          Reset View
                        </span>
                      </button>
                    </div>

                    {/* ── Main Dashboard Body ── */}
                    <div className="flex-1 p-3.5 sm:p-5 lg:p-6 pb-6 sm:pb-8 bg-white space-y-3.5 sm:space-y-4 min-w-0 relative">

                      {/* Top Header Row with Direct Timeframe Quick-Pills & Title */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 relative z-30">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <motion.h3
                            key={currentTabConfig.title}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                            className="font-extrabold text-slate-900 text-xs sm:text-base tracking-tight truncate"
                          >
                            {currentTabConfig.title}
                          </motion.h3>
                          <span className="hidden md:inline-flex text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
                            {currentTabConfig.badge}
                          </span>
                        </div>

                        {/* ── Direct Timeframe Quick-Pills (Desktop) + Dropdown (Mobile) ── */}
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Desktop Quick-Select Pills */}
                          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100/90 border border-slate-200/70">
                            {dateRanges.map((range, idx) => {
                              const isSelected = selectedRangeIndex === idx;
                              return (
                                <button
                                  key={range.id}
                                  onClick={() => setSelectedRangeIndex(idx)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/70'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  {range.shortLabel}
                                </button>
                              );
                            })}
                          </div>

                          {/* Mobile Dropdown Button */}
                          <div className="relative sm:hidden" ref={dropdownRef}>
                            <button
                              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-[11px] font-bold text-slate-700"
                            >
                              <Calendar className="w-3 h-3 text-emerald-600" />
                              <span>{activeData.shortLabel}</span>
                              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isDateDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute right-0 top-full mt-1 w-48 rounded-2xl bg-white border border-slate-200 shadow-2xl p-1 z-50 text-left"
                                >
                                  {dateRanges.map((range, idx) => (
                                    <button
                                      key={range.id}
                                      onClick={() => {
                                        setSelectedRangeIndex(idx);
                                        setIsDateDropdownOpen(false);
                                      }}
                                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold ${
                                        selectedRangeIndex === idx
                                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                                          : 'text-slate-700 hover:bg-slate-50'
                                      }`}
                                    >
                                      <span>{range.label}</span>
                                      {selectedRangeIndex === idx && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* 4 Metric Cards Grid (Dynamic values based on Selected Tab & Date) */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                        {currentMetrics.map((metric, idx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <motion.div
                              key={`${activeTab}-${metric.label}-${activeData.id}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.04 }}
                              className={`p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br ${metric.bgGradient} border ${metric.border} shadow-soft-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-default group`}
                            >
                              <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-slate-500">
                                <MetricIcon className={`w-3 h-3 ${metric.iconColor} group-hover:scale-110 transition-transform`} />
                                <span className="truncate">{metric.label}</span>
                              </div>
                              <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 mt-0.5 tracking-tight truncate">
                                {metric.value}
                              </p>
                              <p className={`text-[9.5px] sm:text-[10px] font-bold ${metric.growthColor} mt-0.5 truncate`}>
                                {metric.growth}
                              </p>
                              {/* Dynamic Sparkline */}
                              <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                                <path d={metric.spark} fill="none" stroke={metric.sparkStroke} strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* ── Main Dual-Line Graph Area (Changes dynamically on tab & date selection) ── */}
                      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900/[0.02] via-emerald-500/[0.03] to-slate-50/80 border border-slate-200/90 shadow-xs space-y-2.5 relative overflow-hidden group">
                        {/* Header with Legends and Performance Status */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/95 border border-slate-200/80 shadow-2xs">
                              <span className="w-2 h-2 rounded-full shadow-xs" style={{ backgroundColor: currentGraph.color1 }} />
                              <span className="font-extrabold text-slate-800 text-[10px] sm:text-[11px]">{currentTabConfig.legend1}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/95 border border-slate-200/80 shadow-2xs">
                              <span className="w-2 h-2 rounded-full shadow-xs" style={{ backgroundColor: currentGraph.color2 }} />
                              <span className="font-extrabold text-slate-800 text-[10px] sm:text-[11px]">{currentTabConfig.legend2}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-[10px] sm:text-[10.5px] bg-emerald-50/95 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            <span>{activeData.label} • {currentTabConfig.statusBadge || 'Optimized Growth'}</span>
                          </div>
                        </div>

                        {/* Dynamic SVG Chart with Neon Glow & Interactive Scrubbing */}
                        <div
                          className="h-32 sm:h-38 w-full relative cursor-crosshair select-none"
                          onMouseMove={handleGraphMouseMove}
                          onMouseLeave={handleGraphMouseLeave}
                        >
                          {/* Floating Tooltip on Hover */}
                          <AnimatePresence>
                            {isHoveringGraph && hoveredNodeData && (
                              <motion.div
                                key={`tooltip-${hoveredNodeIndex}`}
                                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.12 }}
                                style={{
                                  left: `${Math.min(82, Math.max(18, (activeData.nodes[hoveredNodeIndex].x / 320) * 100))}%`
                                }}
                                className="absolute -top-10 -translate-x-1/2 z-40 pointer-events-none px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 flex items-center gap-2 whitespace-nowrap text-white"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-[10.5px] font-bold text-slate-300">{hoveredNodeData.label}</span>
                                </div>
                                <span className="w-px h-3 bg-slate-700" />
                                <div className="flex items-center gap-1 text-[11px] font-extrabold text-white">
                                  <span className="text-slate-400 text-[9.5px]">{hoveredNodeData.legend1}:</span>
                                  <span className="text-emerald-400 font-black">{hoveredNodeData.val1}</span>
                                </div>
                                <span className="text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-1.5 py-0.5 rounded-md">
                                  {hoveredNodeData.badge}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Default High-Water Mark Badge when NOT hovering */}
                          {!isHoveringGraph && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                              transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
                              style={{
                                left: `${Math.min(86, Math.max(14, (currentGraph.peakX / 320) * 100))}%`,
                                top: `${Math.max(4, (currentGraph.peakY / 100) * 100 - 18)}%`
                              }}
                              className="absolute -translate-x-1/2 pointer-events-none hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white text-[9.5px] font-black shadow-lg shadow-emerald-600/35 border border-emerald-300/40 whitespace-nowrap z-20"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                              <span>Peak Scale {activeData.badge}</span>
                            </motion.div>
                          )}

                          {/* Y-axis markers */}
                          <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[9px] font-semibold text-slate-400 pointer-events-none pr-2">
                            {currentTabConfig.yAxis.map((val, idx) => (
                              <span key={idx}>{val}</span>
                            ))}
                          </div>

                          <svg className="w-full h-full pl-6 overflow-visible" viewBox="0 0 320 100" preserveAspectRatio="none">
                            <defs>
                              {/* Multi-stop glowing gradients */}
                              <linearGradient id="emeraldHeroFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                                <stop offset="45%" stopColor="#059669" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="#047857" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="tealHeroFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.22" />
                                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="amberHeroFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="blueHeroFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.24" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                              </linearGradient>

                              {/* Laser stroke gradients */}
                              <linearGradient id="laserStrokeEmerald" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#059669" />
                                <stop offset="35%" stopColor="#10B981" />
                                <stop offset="75%" stopColor="#14B8A6" />
                                <stop offset="100%" stopColor="#06B6D4" />
                              </linearGradient>

                              <linearGradient id="laserStrokeTeal" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0D9488" />
                                <stop offset="60%" stopColor="#0284C7" />
                                <stop offset="100%" stopColor="#6366F1" />
                              </linearGradient>

                              {/* Subtle background cyber dot grid */}
                              <pattern id="chartGridDots" width="16" height="16" patternUnits="userSpaceOnUse">
                                <circle cx="1.5" cy="1.5" r="0.75" fill="#CBD5E1" opacity="0.35" />
                              </pattern>
                            </defs>

                            {/* Background Grid Pattern */}
                            <rect x="0" y="0" width="320" height="100" fill="url(#chartGridDots)" opacity="0.45" />

                            {/* Horizontal Grid lines */}
                            <line x1="0" y1="10" x2="320" y2="10" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
                            <line x1="0" y1="40" x2="320" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
                            <line x1="0" y1="70" x2="320" y2="70" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
                            <line x1="0" y1="98" x2="320" y2="98" stroke="#CBD5E1" strokeWidth="1" opacity="0.8" />

                            {/* Vertical Scanning Guide Line when hovering */}
                            {isHoveringGraph && cursorX !== null && (
                              <line
                                x1={cursorX}
                                y1="5"
                                x2={cursorX}
                                y2="98"
                                stroke="#10B981"
                                strokeWidth="1.2"
                                strokeDasharray="2 2"
                                className="pointer-events-none"
                                opacity="0.75"
                              />
                            )}

                            {/* Area 2 Fill */}
                            <motion.polygon
                              key={`area2-${activeTab}-${activeData.id}`}
                              points={currentGraph.area2}
                              fill={currentGraph.fill2}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.35 }}
                            />
                            {/* Line 2 */}
                            <motion.path
                              key={`line2-${activeTab}-${activeData.id}`}
                              d={currentGraph.line2}
                              fill="none"
                              stroke={currentGraph.color2}
                              strokeWidth={currentGraph.strokeWidth2}
                              strokeLinecap="round"
                              className="neon-graph-glow-secondary"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.65, ease: 'easeOut' }}
                            />

                            {/* Area 1 Fill */}
                            <motion.polygon
                              key={`area1-${activeTab}-${activeData.id}`}
                              points={currentGraph.area1}
                              fill={currentGraph.fill1}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.35 }}
                            />
                            {/* Line 1 with Neon Laser Glow */}
                            <motion.path
                              key={`line1-${activeTab}-${activeData.id}`}
                              d={currentGraph.line1}
                              fill="none"
                              stroke={currentGraph.color1}
                              strokeWidth={currentGraph.strokeWidth1}
                              strokeLinecap="round"
                              className="neon-graph-glow"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.65, ease: 'easeOut' }}
                            />

                            {/* Interactive Data Nodes along Curve 1 */}
                            {activeData.nodes?.map((node, idx) => {
                              const isHovered = isHoveringGraph && hoveredNodeIndex === idx;
                              return (
                                <g key={idx} className="pointer-events-none transition-all duration-200">
                                  {isHovered && (
                                    <circle
                                      cx={node.x}
                                      cy={node.y}
                                      r="9"
                                      fill={currentGraph.color1}
                                      opacity="0.3"
                                      className="animate-ping"
                                    />
                                  )}
                                  <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={isHovered ? '4.5' : '2.8'}
                                    fill="#FFFFFF"
                                    stroke={currentGraph.color1}
                                    strokeWidth={isHovered ? '2.5' : '1.8'}
                                    className="transition-all duration-200"
                                  />
                                </g>
                              );
                            })}

                            {/* Peak Interactive Radar Ping (When not hovering) */}
                            {!isHoveringGraph && (
                              <>
                                <circle cx={currentGraph.peakX} cy={currentGraph.peakY} r="3.5" fill={currentGraph.color1} />
                                <circle cx={currentGraph.peakX} cy={currentGraph.peakY} r="9" fill={currentGraph.color1} opacity="0.45" className="animate-ping" />
                              </>
                            )}
                          </svg>

                          {/* Dynamic Date labels along bottom */}
                          <div className="pl-6 pt-2 flex items-center justify-between text-[9.5px] font-bold text-slate-400 select-none">
                            {activeData.dates.map((d, i) => {
                              const isNodeActive = isHoveringGraph && hoveredNodeIndex === i;
                              return (
                                <span
                                  key={i}
                                  className={`transition-colors duration-150 ${
                                    isNodeActive ? 'text-emerald-600 font-black' : 'hover:text-slate-600'
                                  }`}
                                >
                                  {d}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: SPECIALIST PROFILE PICTURE SHOWCASE (1st CLICK) */}
              {heroMode === 'profile' && (
                <motion.div
                  key="hero-view-profile"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative w-full max-w-[670px] rounded-3xl bg-[#0B132B] shadow-2xl shadow-emerald-950/25 border border-emerald-500/30 overflow-hidden flex flex-col transform lg:rotate-[1deg] lg:hover:rotate-0 transition-transform duration-500 text-white"
                >
                  {/* macOS Style Luxury Window Header Bar */}
                  <div className="bg-[#070E22] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Senior Google Ads & DTC Growth Specialist</span>
                    </div>

                    <button
                      onClick={cycleHeroMode}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                      title="Click to view Profit Arrow"
                    >
                      <RefreshCw className="w-3 h-3 text-emerald-400" />
                      <span>NEXT: PROFIT ARROW →</span>
                    </button>
                  </div>

                  {/* Profile Content Body */}
                  <div className="p-5 sm:p-6 lg:p-7 relative overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#0E1B33] to-[#042B20] flex-1 flex flex-col justify-between">
                    {/* Ambient background glows */}
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-emerald-500/15 filter blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-500/10 filter blur-3xl pointer-events-none" />

                    {/* Top Identity Block */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-4 border-b border-slate-800/80">
                      {/* Profile Avatar with Dual Rotating Glowing Rings */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                        <motion.div
                          animate={shouldReduceMotion ? {} : { rotate: 360 }}
                          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                          className="absolute -inset-2 rounded-full border border-dashed border-emerald-400/40"
                        />
                        <motion.div
                          animate={shouldReduceMotion ? {} : { rotate: -360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                          className="absolute -inset-1 rounded-full border border-teal-400/30"
                        />
                        <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-emerald-500/60 shadow-2xl shadow-emerald-950/60 bg-slate-800">
                          <img
                            src={profilePic}
                            alt={personalInfo.name}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Active Online Badge */}
                        <div className="absolute bottom-0.5 right-0.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black border-2 border-[#0B132B] shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>ONLINE</span>
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 text-center sm:text-left space-y-1.5">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                            Google Ads Partner
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                            <span className="flex gap-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            </span>
                            <span>Top 3% Specialist</span>
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {personalInfo.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-emerald-400">
                          E-Commerce Scaling & Full-Funnel Google Ads Architect
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-black text-slate-200">5.0</span>
                          <span className="text-xs text-slate-400 font-medium">• 100+ Global DTC Clients</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Proof Metrics 4-Grid */}
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors text-center sm:text-left">
                        <p className="text-[10px] font-bold text-slate-400">Ad Spend Managed</p>
                        <p className="text-base sm:text-lg font-black text-white mt-0.5">$15M+</p>
                        <p className="text-[9.5px] font-bold text-emerald-400">Profitable DTC</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors text-center sm:text-left">
                        <p className="text-[10px] font-bold text-slate-400">Average ROAS</p>
                        <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">3.4x - 6.8x</p>
                        <p className="text-[9.5px] font-bold text-teal-400">Scale Multiplier</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors text-center sm:text-left">
                        <p className="text-[10px] font-bold text-slate-400">CPA Reduction</p>
                        <p className="text-base sm:text-lg font-black text-white mt-0.5">-34%</p>
                        <p className="text-[9.5px] font-bold text-emerald-400">Cut Waste</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors text-center sm:text-left">
                        <p className="text-[10px] font-bold text-slate-400">Turnaround</p>
                        <p className="text-base sm:text-lg font-black text-white mt-0.5">48 Hours</p>
                        <p className="text-[9.5px] font-bold text-amber-400">Audit Delivery</p>
                      </div>
                    </div>

                    {/* Expertise Pill Tags */}
                    <div className="relative z-10 flex flex-wrap gap-1.5 py-1">
                      {[
                        'Performance Max Scaling',
                        'Negative Keyword Precision',
                        'Server-Side CAPI Tracking',
                        'Google Merchant Feeds',
                        'High-Intent Search',
                      ].map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-[10px] font-bold text-emerald-300"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 mt-2">
                      <button
                        onClick={onBookCall}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Claim Free 30-Min Audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={cycleHeroMode}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Next: Profit Arrow</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 3: PROFIT ARROW WITH UPWARD ANIMATION (2nd CLICK) */}
              {heroMode === 'profit' && (
                <motion.div
                  key="hero-view-profit"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative w-full max-w-[670px] rounded-3xl bg-[#091024] shadow-2xl shadow-emerald-950/25 border border-emerald-500/35 overflow-hidden flex flex-col transform lg:rotate-[-1deg] lg:hover:rotate-0 transition-transform duration-500 text-white"
                >
                  {/* macOS Style Luxury Window Header Bar */}
                  <div className="bg-[#050B1A] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-semibold text-slate-300">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Compounded Profit Acceleration Trajectory</span>
                    </div>

                    <button
                      onClick={cycleHeroMode}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                      title="Click to cycle back to Graph"
                    >
                      <RefreshCw className="w-3 h-3 text-emerald-400" />
                      <span>BACK TO GRAPH →</span>
                    </button>
                  </div>

                  {/* Profit Arrow Animation Body */}
                  <div className="p-5 sm:p-6 lg:p-7 relative overflow-hidden bg-gradient-to-br from-[#091024] via-[#0B172E] to-[#04281E] flex-1 flex flex-col justify-between">
                    {/* Ambient Glows */}
                    <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-emerald-500/20 filter blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-teal-500/15 filter blur-3xl pointer-events-none" />

                    {/* Main Grid: Animated Upward Arrow + Stats */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      {/* Left: Large Animated Upward Rocket / Laser Arrow Vector */}
                      <div className="sm:col-span-6 relative flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 overflow-hidden min-h-[220px]">
                        {/* Subtle cyber grid */}
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        />

                        {/* Floating Rising Profit Badges */}
                        <motion.div
                          animate={{ y: [0, -36], opacity: [0, 1, 0] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                          className="absolute top-6 left-5 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-black text-emerald-300"
                        >
                          +$45.2K Profit
                        </motion.div>

                        <motion.div
                          animate={{ y: [0, -40], opacity: [0, 1, 0] }}
                          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
                          className="absolute bottom-10 right-5 px-2 py-0.5 rounded-md bg-teal-500/20 border border-teal-400/40 text-[9px] font-black text-teal-300"
                        >
                          6.8x Peak ROAS
                        </motion.div>

                        {/* The High-Tech 3D Upward Arrow Canvas */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          {/* Animated Laser Pulse Halo */}
                          <motion.div
                            animate={{ scale: [0.95, 1.2, 0.95], opacity: [0.3, 0.65, 0.3] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-3 rounded-full bg-emerald-500/20 filter blur-lg"
                          />

                          <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="profitLaserGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#059669" />
                                <stop offset="35%" stopColor="#10B981" />
                                <stop offset="70%" stopColor="#14B8A6" />
                                <stop offset="100%" stopColor="#06B6D4" />
                              </linearGradient>
                              <filter id="profitArrowGlow" x="-25%" y="-25%" width="150%" height="150%">
                                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#10B981" floodOpacity="0.8" />
                              </filter>
                            </defs>

                            {/* Diagonal Upward Guideline Track */}
                            <line x1="20" y1="120" x2="115" y2="25" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />

                            {/* Animated Continuous Rising Laser Stream */}
                            <motion.line
                              x1="20"
                              y1="120"
                              x2="115"
                              y2="25"
                              stroke="url(#profitLaserGrad)"
                              strokeWidth="6"
                              strokeLinecap="round"
                              filter="url(#profitArrowGlow)"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: [0, 1, 1] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Dynamic Upward Arrow Head with Floating Bounce */}
                            <motion.g
                              animate={{
                                x: [0, 6, 0],
                                y: [0, -6, 0],
                              }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <path
                                d="M72 20 L120 20 L120 68 L104 52 L68 88 L52 72 L88 36 Z"
                                fill="url(#profitLaserGrad)"
                                filter="url(#profitArrowGlow)"
                              />
                            </motion.g>

                            {/* Glowing Arrow Beacon Tip */}
                            <circle cx="118" cy="22" r="4.5" fill="#FFFFFF" />
                            <circle cx="118" cy="22" r="12" fill="#10B981" opacity="0.45" className="animate-ping" />
                          </svg>
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-black">
                          <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
                          <span>Upward Profit Velocity</span>
                        </div>
                      </div>

                      {/* Right: Compounding ROAS Metrics & Strategy Track */}
                      <div className="sm:col-span-6 space-y-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                            Compounded Revenue Lift
                          </span>
                          <div className="flex items-baseline gap-2 mt-1">
                            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 tracking-tight">
                              +342%
                            </h3>
                            <span className="text-xs font-bold text-emerald-300">Average ROAS Lift</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Targeted high-intent bidding architectures convert ad spend into compounding net profits.
                          </p>
                        </div>

                        {/* Before vs After Comparison Bars */}
                        <div className="space-y-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="text-slate-400 font-bold">Previous Setup:</span>
                            <span className="font-bold text-red-400">1.8x ROAS • $8.40 CPA</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div className="w-[28%] h-full bg-red-500/70 rounded-full" />
                          </div>

                          <div className="flex items-center justify-between text-[10.5px] pt-1">
                            <span className="text-emerald-400 font-bold">Antigravity Growth:</span>
                            <span className="font-black text-emerald-300">5.4x - 6.8x ROAS • $3.20 CPA</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '94%' }}
                              transition={{ duration: 1.2, delay: 0.3 }}
                              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-xs shadow-emerald-400"
                            />
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={onBookCall}
                            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Scale My Brand</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={cycleHeroMode}
                            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3 text-emerald-400" />
                            <span className="hidden xs:inline">Graph</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Floating Card 1: 100+ Happy Clients (Bottom-Left) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatSlow}
                animate="animate"
                className="absolute -bottom-7 sm:-bottom-8 left-1 sm:left-3 z-30 glass-card-luxury rounded-2xl p-2.5 sm:p-3.5 shadow-2xl border border-emerald-100/90 flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-12px)] sm:max-w-none"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center -space-x-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-[8px] font-black text-white shadow-xs">S</div>
                    <div className="w-5 h-5 rounded-full bg-teal-500 border border-white flex items-center justify-center text-[8px] font-black text-white shadow-xs">A</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[8px] font-black text-white shadow-xs">M</div>
                    <div className="w-5 h-5 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[8px] font-black text-white shadow-xs">D</div>
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-white flex items-center justify-center text-[7px] font-bold text-white shadow-xs">+96</div>
                  </div>
                  <p className="text-xs font-black text-slate-900 leading-tight">100+ Happy Clients</p>
                  <p className="text-[10px] font-bold text-emerald-700">Across Global Markets</p>
                </div>
              </motion.div>
            )}

            {/* ─── Floating Card 2: Campaigns Performance Donut (Dynamic based on selected date) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatReverse}
                animate="animate"
                className="absolute -bottom-8 sm:-bottom-9 right-2 sm:right-6 z-30 glass-card-luxury rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-slate-200/90 hidden sm:flex items-center gap-3.5"
              >
                <div>
                  <p className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    Campaign Performance
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Dynamic SVG Donut Chart */}
                    <div className="w-11 h-11 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                        {/* PMax % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#059669" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.pmax} 100`}
                          strokeDashoffset="0"
                        />
                        {/* Search % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#0D9488" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.search} 100`}
                          strokeDashoffset={`-${activeData.donut.pmax}`}
                        />
                        {/* Shopping % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#F59E0B" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.shopping} 100`}
                          strokeDashoffset={`-${activeData.donut.pmax + activeData.donut.search}`}
                        />
                      </svg>
                    </div>

                    {/* Dynamic Donut Legend */}
                    <div className="space-y-1 text-[9.5px] font-bold text-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> PMax
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.pmax}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> Search
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.search}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Shopping
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.shopping}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
