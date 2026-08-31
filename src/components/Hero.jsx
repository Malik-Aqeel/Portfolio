import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, TrendingUp, TrendingDown, Target, Rocket,
  LineChart, Home, Grid, Users, Settings, Calendar,
  Star, ChevronDown, Check, CheckCircle2, ShieldCheck, Zap,
  Activity, ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import googleAdsImg from '../assets/google_ads_img.jpeg';

// Interactive Date Ranges Dataset
const dateRanges = [
  {
    id: '7D',
    label: 'Last 7 Days',
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
    peakX: 320,
    peakY: 8,
    dates: ['Day 1', 'Day 2', 'Day 4', 'Day 6', 'Day 7'],
    sparkClicks: 'M0,14 Q10,4 20,11 T40,6 T60,2',
    sparkConv: 'M0,15 Q15,6 28,12 T45,7 T60,3',
    sparkCpa: 'M0,5 Q15,14 30,8 T45,13 T60,16',
    sparkVal: 'M0,16 Q12,8 25,12 T48,6 T60,1',
    donut: { search: 55, pmax: 25, shopping: 20 },
  },
  {
    id: '30D',
    label: 'Last 30 Days',
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
    peakX: 320,
    peakY: 12,
    dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    sparkClicks: 'M0,16 Q15,8 30,12 T45,5 T60,2',
    sparkConv: 'M0,17 Q15,10 32,8 T48,4 T60,2',
    sparkCpa: 'M0,4 Q15,10 30,12 T48,15 T60,17',
    sparkVal: 'M0,17 Q14,9 28,10 T46,4 T60,1',
    donut: { search: 58, pmax: 28, shopping: 14 },
  },
  {
    id: '90D',
    label: 'Last 90 Days',
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
    peakX: 320,
    peakY: 6,
    dates: ['Month 1', 'Month 2', 'Month 3', 'Current'],
    sparkClicks: 'M0,17 Q15,12 30,9 T45,4 T60,1',
    sparkConv: 'M0,18 Q16,12 32,8 T48,3 T60,1',
    sparkCpa: 'M0,3 Q16,8 32,12 T48,15 T60,18',
    sparkVal: 'M0,18 Q15,10 30,7 T48,3 T60,1',
    donut: { search: 62, pmax: 26, shopping: 12 },
  },
  {
    id: 'Year',
    label: 'Year',
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
    peakX: 320,
    peakY: 4,
    dates: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
    sparkClicks: 'M0,18 Q16,14 32,9 T48,4 T60,1',
    sparkConv: 'M0,18 Q16,13 32,7 T48,3 T60,1',
    sparkCpa: 'M0,2 Q16,8 32,13 T48,16 T60,18',
    sparkVal: 'M0,18 Q15,9 30,6 T48,2 T60,1',
    donut: { search: 65, pmax: 24, shopping: 11 },
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
    telemetrySuffix: 'Telemetry',
    getMetrics: (data) => [
      {
        icon: LineChart,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/50 to-white',
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
        bgGradient: 'from-teal-50/50 to-white',
        border: 'border-teal-100',
        label: 'Conversions',
        value: data.conversions,
        growth: data.conversionsGrowth,
        growthColor: 'text-teal-600',
        spark: data.sparkConv,
        sparkStroke: '#0D9488',
      },
      {
        icon: LineChart,
        iconColor: 'text-amber-500',
        bgGradient: 'from-amber-50/30 to-white',
        border: 'border-slate-100',
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
        bgGradient: 'from-emerald-50/60 to-teal-50/40',
        border: 'border-emerald-200/60',
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
      strokeWidth1: '2.5',
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
    telemetrySuffix: 'Real-Time ROI',
    getMetrics: (data) => {
      const roasMap = { '7D': '4.12x', '30D': '4.85x', '90D': '5.20x', 'Year': '5.64x' };
      const spendMap = { '7D': '$9.8K', '30D': '$38.2K', '90D': '$114K', 'Year': '$218K' };
      const profitMap = { '7D': '64.2%', '30D': '68.5%', '90D': '71.2%', 'Year': '74.8%' };
      return [
        {
          icon: Zap,
          iconColor: 'text-emerald-600',
          bgGradient: 'from-emerald-50/50 to-white',
          border: 'border-emerald-200/70',
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
          bgGradient: 'from-teal-50/50 to-white',
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
          bgGradient: 'from-blue-50/30 to-white',
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
          bgGradient: 'from-indigo-50/40 to-white',
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
    telemetrySuffix: 'Channel Mix',
    getMetrics: (data) => [
      {
        icon: Grid,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/50 to-white',
        border: 'border-emerald-100',
        label: 'PMax Share',
        value: `${data.donut.pmax + 35}%`,
        growth: '↑ Primary Scale',
        growthColor: 'text-emerald-600',
        spark: 'M0,16 Q15,7 30,10 T45,4 T60,1',
        sparkStroke: '#059669',
      },
      {
        icon: Rocket,
        iconColor: 'text-teal-600',
        bgGradient: 'from-teal-50/50 to-white',
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
        bgGradient: 'from-amber-50/30 to-white',
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
        bgGradient: 'from-emerald-50/60 to-teal-50/40',
        border: 'border-emerald-200/60',
        label: 'Active SKUs',
        value: '1,420+',
        growth: 'Top Tier Tiered',
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
      strokeWidth1: '2.5',
      line2: 'M0,88 Q30,80 65,72 T130,60 T195,50 T260,42 T320,34',
      area2: '0,88 30,80 65,72 95,78 130,60 160,58 195,50 230,48 260,42 290,38 320,34 320,100 0,100',
      color2: '#0D9488',
      fill2: 'url(#tealHeroFill)',
      strokeWidth2: '2',
      peakX: 320,
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
    telemetrySuffix: 'Cost Down / Conv Up',
    getMetrics: (data) => [
      {
        icon: Target,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/50 to-white',
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
        bgGradient: 'from-teal-50/50 to-white',
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
        bgGradient: 'from-blue-50/30 to-white',
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
        bgGradient: 'from-emerald-50/60 to-teal-50/40',
        border: 'border-emerald-200/60',
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
      strokeWidth1: '2.6',
      line2: 'M0,25 Q25,36 60,48 T120,58 T180,68 T240,78 T320,86',
      area2: '0,25 25,36 60,48 90,44 120,58 150,60 180,68 210,72 240,78 280,82 320,86 320,100 0,100',
      color2: '#F59E0B',
      fill2: 'url(#amberHeroFill)',
      strokeWidth2: '2',
      peakX: 320,
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
    telemetrySuffix: 'Cohort Scaling',
    getMetrics: (data) => [
      {
        icon: Users,
        iconColor: 'text-emerald-600',
        bgGradient: 'from-emerald-50/50 to-white',
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
        bgGradient: 'from-teal-50/50 to-white',
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
        bgGradient: 'from-blue-50/30 to-white',
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
        bgGradient: 'from-amber-50/30 to-white',
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
      strokeWidth1: '2.6',
      line2: 'M0,90 Q25,82 60,72 T120,60 T180,48 T240,36 T320,24',
      area2: '0,90 25,82 60,72 90,76 120,60 150,56 180,48 210,44 240,36 280,30 320,24 320,100 0,100',
      color2: '#0D9488',
      fill2: 'url(#tealHeroFill)',
      strokeWidth2: '2',
      peakX: 320,
      peakY: 4,
    }),
  },
};

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(1); // Default to Last 30 Days
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeData = dateRanges[selectedRangeIndex];
  const currentTabConfig = tabConfigs[activeTab] || tabConfigs.home;
  const currentMetrics = currentTabConfig.getMetrics(activeData);
  const currentGraph = currentTabConfig.getGraph(activeData);

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
      rotate: [-1.5, 1.5, -1.5],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-8 lg:pt-28 lg:pb-12 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFB] to-[#F0F7F4] min-h-[calc(100vh-20px)] flex flex-col justify-center"
    >
      {/* ─── Ambient Glow Meshes (Matching Website Theme) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 right-1/4 w-[650px] h-[650px] rounded-full opacity-30 blur-2xl pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.05) 55%, transparent 75%)' }}
        />
        <div
          className="absolute bottom-4 right-10 w-[450px] h-[450px] rounded-full opacity-25 blur-2xl pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -top-16 left-12 w-[450px] h-[450px] rounded-full opacity-20 blur-2xl pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 65%)' }}
        />
      </div>

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ═════════════════════════════════════════════════════
              LEFT COLUMN: High-Converting Headline & Trust Elements
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-5 text-left">

            {/* Small Top Badge with Pulsing Emerald Radar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 shadow-soft-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-wide uppercase">
                Driving Results • Delivering Growth
              </span>
            </motion.div>

            {/* Main Bold Headline with Website Emerald Theme & Hand-drawn Curve */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black text-slate-900 tracking-tight leading-[1.22] pb-1"
            >
              More Clicks.
              <br />
              Better Conversions.
              <br />
              <span className="relative inline-block">
                <span className="animated-growth-gradient font-black">
                  Maximum Growth.
                </span>
                {/* Hand-drawn Accent curve with vibrant gradient */}
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
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md"
            >
              I help e-commerce and DTC businesses scale profitably with data-driven Google Ads strategies that lower CPA and maximize ROAS.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1"
            >
              <button
                onClick={onBookCall}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 button-shine relative overflow-hidden"
              >
                <span>Get Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#case-studies"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-soft-sm hover:border-emerald-300 transition-all flex items-center justify-center gap-2"
              >
                <LineChart className="w-4 h-4 text-emerald-600" />
                <span>View Case Studies</span>
              </a>
            </motion.div>

            {/* 3 Pillars / Feature Row at Bottom (Responsive on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-3 border-t border-slate-200/70"
            >
              <div className="flex items-center sm:items-start gap-2.5 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Target Right</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">High-intent buyers</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-2.5 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Lower Cost</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Reduce CPA & waste</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-2.5 group">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Higher ROI</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Scale revenue profitably</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ═════════════════════════════════════════════════════
              RIGHT COLUMN: Perspective 3D Google Ads Dashboard
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 relative flex items-center justify-center pb-8 sm:pb-4 lg:pb-0">

            {/* Floating 3D Target Dartboard at Bottom-Right */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatReverse}
                animate="animate"
                className="absolute -bottom-8 -right-4 sm:-right-8 z-30 pointer-events-none hidden sm:block"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative filter drop-shadow-2xl">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <defs>
                      <radialGradient id="targetGradEmerald1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#047857" />
                      </radialGradient>
                      <radialGradient id="targetGradWhite" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#ECFDF5" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="60" cy="60" rx="52" ry="46" fill="url(#targetGradEmerald1)" opacity="0.95" />
                    <ellipse cx="60" cy="58" rx="46" ry="40" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="34" ry="30" fill="url(#targetGradEmerald1)" />
                    <ellipse cx="60" cy="58" rx="22" ry="19" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="12" ry="10" fill="#065F46" />
                    <g transform="translate(68, 30) rotate(-35)">
                      <rect x="0" y="0" width="6" height="34" rx="2" fill="#059669" />
                      <polygon points="-4,34 10,34 3,46" fill="#047857" />
                      <polygon points="-6,0 12,0 3,-10" fill="#34D399" />
                    </g>
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── Main Perspective Angled Tablet Dashboard ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[660px] rounded-3xl bg-white shadow-2xl shadow-emerald-950/10 border border-slate-200/90 overflow-visible flex transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500"
            >

              {/* ── Dark Left Sidebar (Deep Navy Slate with Emerald Active Highlights) ── */}
              <div className="w-14 sm:w-16 bg-[#0B132B] text-slate-400 flex flex-col items-center py-5 justify-between shrink-0 rounded-l-3xl">
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={googleAdsImg}
                      alt="Google Ads"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
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
              <div className="flex-1 p-3 sm:p-5 lg:p-6 bg-white space-y-3.5 sm:space-y-4 min-w-0 rounded-r-3xl relative">

                {/* Top Header Row with Interactive Date Dropdown Picker */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-100 pb-3 relative z-30">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
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

                  {/* ── Interactive Date Picker Pill & Dropdown ── */}
                  <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 text-[10px] sm:text-[11px] font-bold text-slate-700 hover:text-emerald-700 transition-all shadow-xs cursor-pointer select-none"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{activeData.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isDateDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl p-1.5 z-50 text-left"
                        >
                          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Select Timeframe
                          </div>
                          <div className="py-1 space-y-0.5">
                            {dateRanges.map((range, idx) => {
                              const isSelected = selectedRangeIndex === idx;
                              return (
                                <button
                                  key={range.id}
                                  onClick={() => {
                                    setSelectedRangeIndex(idx);
                                    setIsDateDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <span className="leading-tight">{range.label}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">
                                      {range.badge}
                                    </span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                        className={`p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br ${metric.bgGradient} border ${metric.border} shadow-soft-sm hover:shadow-md transition-all`}
                      >
                        <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-slate-400">
                          <MetricIcon className={`w-3 h-3 ${metric.iconColor}`} />
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
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentGraph.color1 }} />
                        <span className="font-bold text-slate-800">{currentTabConfig.legend1}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentGraph.color2 }} />
                        <span className="font-bold text-slate-800">{currentTabConfig.legend2}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-700 text-[10.5px]">
                      {activeData.label} • {currentTabConfig.telemetrySuffix}
                    </span>
                  </div>

                  {/* Dynamic SVG Chart */}
                  <div className="h-32 sm:h-36 w-full relative">
                    {/* Y-axis markers */}
                    <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[9px] font-semibold text-slate-400 pointer-events-none pr-2">
                      {currentTabConfig.yAxis.map((val, idx) => (
                        <span key={idx}>{val}</span>
                      ))}
                    </div>

                    <svg className="w-full h-full pl-6 overflow-visible" viewBox="0 0 320 100" preserveAspectRatio="none">
                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="10" x2="320" y2="10" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="40" x2="320" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="320" y2="70" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="98" x2="320" y2="98" stroke="#CBD5E1" strokeWidth="1" />

                      <defs>
                        <linearGradient id="emeraldHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="tealHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="amberHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="blueHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

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
                      {/* Line 1 */}
                      <motion.path
                        key={`line1-${activeTab}-${activeData.id}`}
                        d={currentGraph.line1}
                        fill="none"
                        stroke={currentGraph.color1}
                        strokeWidth={currentGraph.strokeWidth1}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                      />

                      {/* Peak Interactive Radar Ping */}
                      <circle cx={currentGraph.peakX} cy={currentGraph.peakY} r="3.5" fill={currentGraph.color1} />
                      <circle cx={currentGraph.peakX} cy={currentGraph.peakY} r="7" fill={currentGraph.color1} opacity="0.4" className="animate-ping" />
                    </svg>

                    {/* Dynamic Date labels along bottom */}
                    <div className="pl-6 pt-1 flex items-center justify-between text-[9px] font-semibold text-slate-400">
                      {activeData.dates.map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ─── Floating Card 1: 100+ Happy Clients (Bottom-Left) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatSlow}
                animate="animate"
                className="absolute -bottom-6 left-1.5 sm:left-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-12px)] sm:max-w-none"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center -space-x-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] font-black text-white">S</div>
                    <div className="w-5 h-5 rounded-full bg-teal-500 border border-white flex items-center justify-center text-[8px] font-black text-white">A</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[8px] font-black text-white">M</div>
                    <div className="w-5 h-5 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[8px] font-black text-white">Z</div>
                  </div>
                  <p className="text-xs font-black text-slate-900 leading-tight">100+ Happy Clients</p>
                  <p className="text-[10px] font-semibold text-slate-400">Across the Globe</p>
                </div>
              </motion.div>
            )}

            {/* ─── Floating Card 2: Campaigns Performance Donut (Dynamic based on selected date) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatBadge}
                animate="animate"
                className="absolute -bottom-8 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 hidden sm:flex items-center gap-4"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Campaigns Performance
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Dynamic SVG Donut Chart */}
                    <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                        {/* Search % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#059669" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.search} 100`}
                          strokeDashoffset="0"
                        />
                        {/* PMax % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#0D9488" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.pmax} 100`}
                          strokeDashoffset={`-${activeData.donut.search}`}
                        />
                        {/* Shopping % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#F59E0B" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.shopping} 100`}
                          strokeDashoffset={`-${activeData.donut.search + activeData.donut.pmax}`}
                        />
                      </svg>
                    </div>

                    {/* Dynamic Donut Legend */}
                    <div className="space-y-1 text-[10px] font-bold text-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Search
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.search}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> PMax
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.pmax}%</span>
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
