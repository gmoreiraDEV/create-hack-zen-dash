"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebarStore } from "@/lib/sidebar-store";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import {
  BarChart3,
  TrendingUp,
  Globe,
  Calendar,
  Target,
  Activity,
  DollarSign,
  FlagIcon,
} from "lucide-react";
import { metrics, monthlyData, topCountries } from "@/constants";

export default function Analytics() {
  const { isOpen } = useSidebarStore();
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main
        className={`flex-1 overflow-auto bg-background transition-all duration-300 ${
          isOpen ? "ml-0" : "ml-0"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b bg-card">
          <SidebarToggle />
          <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        </div>

        <div className="p-6 bg-background min-h-screen">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Missionaries
                </CardTitle>
                <FlagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalMissionaries.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">
                    +{metrics.monthlyGrowth}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Missions
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.activeMissions}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Countries Reached
                </CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.countriesReached}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3</span> new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div
                      key={data.month}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {data.missionaries}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Missionaries
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {data.missions}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Missions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            ${data.donations.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Donations
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Countries by Missionaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCountries.map((country, index) => (
                    <div
                      key={country.country}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {country.missionaries}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {country.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donations
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${metrics.totalDonations.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15.3%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Mission Duration
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.avgMissionDuration} months
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">Stable</span> this quarter
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+1.2%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">Strengths</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        High missionary retention rate (94.2%)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Consistent monthly growth in new registrations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Strong presence in South American markets
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-600">
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Expand to African and Asian markets
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Increase digital outreach programs
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Improve mission completion tracking
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
