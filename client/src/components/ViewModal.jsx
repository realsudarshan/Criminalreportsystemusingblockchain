import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  Home,
  FileText,
  Camera,
  Shield,
  FileSpreadsheet,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ViewModal = ({ isOpen, onClose, crimeData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card
        className={`w-full max-w-4xl max-h-[90vh] overflow-hidden dark shad-dialog px-4`}
      >
        <CardHeader className="flex flex-row items-center justify-between pt-2 pb-4 shad-dialog">
          <CardTitle className="text-2xl font-bold ml-[-20px]">
            {crimeData.title}
          </CardTitle>
          <div className="flex items-center mr-[-20px] mt-[-20px]">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="victim">Victim</TabsTrigger>
              <TabsTrigger value="suspect">Suspect</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 120px)" }}
            >
              <TabsContent value="general" className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    icon={FileText}
                    label="Crime ID"
                    value={crimeData.crimeID}
                  />
                  <InfoItem icon={Shield} label="Type" value={crimeData.type} />
                  <InfoItem
                    icon={Calendar}
                    label="Date"
                    value={crimeData.date}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={crimeData.location}
                  />
                  <InfoItem
                    icon={User}
                    label="Officer in Charge"
                    value={crimeData.officerInCharge}
                  />
                  <InfoItem
                    icon={FileSpreadsheet}
                    label="FIR No"
                    value={crimeData.firno}
                  />
                  <InfoItem
                    icon={User}
                    label="Filed by"
                    value={crimeData.filedby}
                  />
                  <InfoItem
                    icon={RefreshCcw}
                    label="Last Updated"
                    value={crimeData.lastUpdated}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Case Description</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {crimeData.caseDescription}
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <Badge
                    variant={
                      crimeData.status === "closed"
                        ? "secondary"
                        : "destructive"
                    }
                    className={"py-2 px-4"}
                  >
                    Status: {crimeData.status}
                  </Badge>
                  <Badge
                    variant={
                      crimeData.reportStatus === "saved"
                        ? "secondary"
                        : "destructive"
                    }
                    className={"py-2 px-4"}
                  >
                    Report: {crimeData.reportStatus}
                  </Badge>
                </div>
              </TabsContent>
              <TabsContent value="victim" className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Victim Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    icon={User}
                    label="Name"
                    value={crimeData.victim.name}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Contact"
                    value={crimeData.victim.contact}
                  />
                  <InfoItem
                    icon={Home}
                    label="Address"
                    value={crimeData.victim.address}
                  />
                  <InfoItem
                    icon={User}
                    label="Gender"
                    value={crimeData.victim.gender}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Emergency Contact"
                    value={crimeData.victim.econtact}
                  />
                </div>
              </TabsContent>
              <TabsContent value="suspect" className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Suspect Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <InfoItem
                      icon={User}
                      label="Name"
                      value={crimeData.suspect.name}
                    />
                    <InfoItem
                      icon={User}
                      label="Gender"
                      value={crimeData.suspect.gender}
                    />
                    <InfoItem
                      icon={Calendar}
                      label="Age"
                      value={crimeData.suspect.age}
                    />
                    <InfoItem
                      icon={Home}
                      label="Address"
                      value={crimeData.suspect.address}
                    />
                    <InfoItem
                      icon={Phone}
                      label="Contact"
                      value={crimeData.suspect.contact}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={"/assets/images/id.jpg"}
                      alt="Suspect"
                      width={150}
                      height={150}
                      className="rounded-full"
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Suspect Image
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="evidence" className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Evidence</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <InfoItem
                      icon={Camera}
                      label="Type"
                      value={crimeData.evidence.evidenceType}
                    />
                    <InfoItem
                      icon={FileText}
                      label="Description"
                      value={crimeData.evidence.evidenceDescription}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={"/assets/images/pp.jpg"}
                      alt="Evidence"
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Evidence Image
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewModal;

function InfoItem({ icon: Icon, label, value }) {
  const styling = `flex space-x-2 gap-2 ${
    label === "Description" && "flex-col"
  }`;
  return (
    <div className={styling}>
      <div className="flex gap-2">
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 flex" />
        <span className="font-semibold">{label}:</span>
      </div>
      {value}
    </div>
  );
}
