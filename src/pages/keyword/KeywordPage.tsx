import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '../../components';

export function KeywordPage() {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="">
        <div className="pb-10">
          <Tabs defaultValue="singleKeyword" className="h-full space-y-2">
            <div className="space-between flex items-center">
              <TabsList>
                <TabsTrigger value="singleKeyword" className="relative">
                  Single Keyword
                </TabsTrigger>
                <TabsTrigger value="multiKeyword">Multi Keyword</TabsTrigger>
                <TabsTrigger value="topicalAuthority">
                  Topical Authority
                </TabsTrigger>
                <TabsTrigger value="keywordGapAnalysis">
                  Keyword Gap Analysis
                </TabsTrigger>
                <TabsTrigger value="holistic">Holistic</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="singleKeyword"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">Single Keyword Avalanche</div>
              </div>
            </TabsContent>
            <TabsContent
              value="multiKeyword"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">Multi Keyword Avalanche</div>
              </div>
              <Separator className="my-4" />
            </TabsContent>
            <TabsContent
              value="topicalAuthority"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Topical Authority</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="keywordGapAnalysis"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Keyword Gap Analysis</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="holistic"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p>Holistic</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="" />
    </div>
  );
}
