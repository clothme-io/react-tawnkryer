import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '../../components';
import { HolisticComponent } from './components/HolisticComponent';
import { KeywordGapAnalysisComponent } from './components/KeywordGapAnalysisComponent';
import { EditorComponent } from './components/KeywordWriter';
import { SingleKeywordComponent } from './components/SingleKeywordComponent';
import { TopicalAuthorityComponent } from './components/TopicalAuthorityComponent';
import { MultiKeywordComponent } from './components/multiKeywordComponent';

export function KeywordPage() {
  return (
    <div className="h-screen">
      <div className="">
        <div className="pb-10">
          <div className="flex items-center justify-between space-y-2 p-2 pl-4">
            <h2 className="text-3xl font-bold tracking-tight mb-0">Keyword</h2>
          </div>
          <Tabs defaultValue="singleKeyword" className="h-full space-y-2 p-4">
            <div className="space-between flex items-center mb-10">
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
            <Separator className="my-4" />
            <TabsContent
              value="singleKeyword"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="grid grid-cols-12">
                <div className="col-span-3 space-y-1 pr-4 sticky top-2">
                  <SingleKeywordComponent />
                </div>
                <div className="col-span-9 p-10 bg-gray-50 min-h-screen">
                  <EditorComponent />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="multiKeyword"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="flex">
                <div className="basis-1/4 space-y-1 pr-4">
                  <MultiKeywordComponent />
                </div>
                <div className="grow pl-20">Canvas</div>
              </div>
            </TabsContent>
            <TabsContent
              value="topicalAuthority"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="flex">
                <div className="basis-1/4 space-y-1 pr-4">
                  <TopicalAuthorityComponent />
                </div>
                <div className="grow pl-20">Canvas</div>
              </div>
            </TabsContent>
            <TabsContent
              value="keywordGapAnalysis"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="flex">
                <div className="basis-1/4 space-y-1 pr-4">
                  <KeywordGapAnalysisComponent />
                </div>
                <div className="grow pl-20">Canvas</div>
              </div>
            </TabsContent>
            <TabsContent
              value="holistic"
              className="border-none p-0 outline-none pt-8"
            >
              <div className="flex">
                <div className="basis-1/4 space-y-1 pr-4">
                  <HolisticComponent />
                </div>
                <div className="grow pl-20">Canvas</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="" />
    </div>
  );
}
