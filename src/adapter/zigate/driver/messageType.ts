import {ZiGateMessageCode} from "./constants";

export interface ZiGateMessageParameter {
    name: string;
    parameterType: string;
    options?: object;
}

export interface ZiGateMessageType {
    response: ZiGateMessageParameter[];
}

export const ZiGateMessage: { [k: number]: ZiGateMessageType } = {
    [ZiGateMessageCode.GetTimeServer]: {
        response: [
            {name: 'timestampUTC', parameterType:'UINT32'}, // <Timestamp UTC: uint32_t> from 2000-01-01 00:00:00
        ]
    },
    [ZiGateMessageCode.DeviceAnnounce]: {
        response: [
            {name: 'shortAddress', parameterType:'UINT16BE'},
            {name: 'ieee', parameterType:'IEEEADDR'},
            {name: 'MACcapability', parameterType:'MACCAPABILITY'},
            // MAC capability
            // Bit 0 – Alternate PAN Coordinator
            // Bit 1 – Device Type
            // Bit 2 – Power source
            // Bit 3 – Receiver On when Idle
            // Bit 4,5 – Reserved
            // Bit 6 – Security capability
            // Bit 7 – Allocate Address
            {name: 'rejoin', parameterType:'UINT8'},
        ]
    },
    [ZiGateMessageCode.Status]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status:uint8_t>
            // 0 = Success
            // 1 = Incorrect parameters
            // 2 = Unhandled command
            // 3 = Command failed
            // eslint-disable-next-line max-len
            // 4 = Busy (Node is carrying out a lengthy operation and is currently unable to handle the incoming command)
            // 5 = Stack already started (no new configuration accepted)
            // 128 – 244 = Failed (ZigBee event codes)
            // Packet Type: The value of the initiating command request.
            {name: 'sequence', parameterType: 'UINT8'}, // <sequence number: uint8_t>
            {name: 'packetType', parameterType: 'UINT16BE'}, // <Packet Type: uint16_t>
            {name: 'rawError', parameterType: 'BUFFER'}, // <Packet Type: uint16_t>
        ]
    },
    [ZiGateMessageCode.PermitJoinStatus]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status:uint8_t>
        ]
    },
    [ZiGateMessageCode.DataIndication]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            {name: 'profileID', parameterType:'UINT16BE'}, // <Profile ID: uint16_t>
            {name: 'clusterID', parameterType: 'UINT16BE'}, // <cluster ID: uint16_t>
            {name: 'sourceEndpoint', parameterType: 'UINT8'}, // <source endpoint: uint8_t>
            {name: 'destinationEndpoint', parameterType: 'UINT8'}, // <destination endpoint: uint8_t>
            {name: 'sourceAddressMode', parameterType: 'UINT8'}, // <source address mode: uint8_t>
            {name: 'sourceAddress', parameterType: 'ADDRESS_WITH_TYPE_DEPENDENCY'},
            // <source address: uint16_t or uint64_t>
            {name: 'destinationAddressMode', parameterType: 'UINT8'},
            // <destination address mode: uint8_t>
            {name: 'destinationAddress', parameterType: 'ADDRESS_WITH_TYPE_DEPENDENCY'},
            // <destination address: uint16_t or uint64_t>
            // {name: 'payloadSize', parameterType:'UINT8'}, // <payload size : uint8_t>
            {name: 'payload', parameterType: 'BUFFER_RAW'}, // <payload : data each element is
            // uint8_t>
        ]
    },
    [ZiGateMessageCode.APSDataConfirm]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            // {name: 'sourceEndpoint', parameterType:'UINT8'}, // <source endpoint: uint8_t>
            // {name: 'destinationAddressMode', parameterType:'UINT8'},
            // // <destination address mode: uint8_t>
            {name: 'destinationAddress', parameterType:'UINT16BE'},
            {name: 'destinationEndpoint', parameterType:'UINT8'}, // <destination endpoint: uint8_t>
            {name: 'clusterID', parameterType:'UINT16BE'},
            // // <destination address: uint16_t or uint64_t>
            {name: 'seqNumber', parameterType:'UINT8'}, // <seq number: uint8_t>
        ]
    },
    [ZiGateMessageCode.NetworkState]: {
        response: [
            {name: 'shortAddress', parameterType:'UINT16BE'}, // <Short Address: uint16_t>
            {name: 'extendedAddress', parameterType:'IEEEADDR'}, // <Extended Address: uint64_t>
            {name: 'PANID', parameterType:'UINT16BE'}, // <PAN ID: uint16_t>
            {name: 'ExtPANID', parameterType:'IEEEADDR'}, // <Ext PAN ID: uint64_t>
            {name: 'Channel', parameterType:'UINT8'}, // <Channel: uint8_t>
        ]
    },
    [ZiGateMessageCode.VersionList]: {
        response: [
            {name: 'majorVersion', parameterType: 'UINT16BE'}, // <Major version number: uint16_t>
            {name: 'installerVersion', parameterType: 'UINT16BE'}, // <Installer version number: uint16_t>
        ]
    },
    [ZiGateMessageCode.NetworkJoined]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            // Status:
            // 0 = Joined existing network
            // 1 = Formed new network
            // 128 – 244 = Failed (ZigBee event codes)
            {name: 'shortAddress', parameterType:'UINT16BE'}, // <short address: uint16_t>
            {name: 'extendedAddress', parameterType:'IEEEADDR'}, // <extended address:uint64_t>
            {name: 'channel', parameterType:'UINT8'}, // <channel: uint8_t>
        ]
    },
    [ZiGateMessageCode.LeaveIndication]: {
        response: [
            {name: 'extendedAddress', parameterType:'IEEEADDR'}, // <extended address: uint64_t>
            {name: 'rejoin', parameterType:'UINT8'}, // <rejoin status: uint8_t>
        ]
    },
    [ZiGateMessageCode.RouterDiscoveryConfirm]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            {name: 'nwkStatus', parameterType:'UINT8'}, // <nwk status: uint8_t>
        ]
    },
    [ZiGateMessageCode.APSDataConfirmFail]: {
        response: [
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            {name: 'sourceEndpoint', parameterType:'UINT8'}, // <src endpoint: uint8_t>
            {name: 'destinationEndpoint', parameterType:'UINT8'}, // <dst endpoint: uint8_t>
            {name: 'destinationAddressMode', parameterType:'UINT8'}, // <dst address mode: uint8_t>
            {name: 'destinationAddress', parameterType:'ADDRESS_WITH_TYPE_DEPENDENCY'},
            // <destination address: uint64_t>
            {name: 'seqNumber', parameterType:'UINT8'}, // <seq number: uint8_t>
        ]
    },
    [ZiGateMessageCode.ActiveEndpointResponse]: {
        response: [
            {name: 'sequence', parameterType:'UINT8'}, // <sequence: uint8_t>
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            {name: 'nwkAddr', parameterType:'UINT16'},
            {name: 'endpointCount', parameterType:'UINT8'},
            {name: 'endpoints', parameterType: 'LIST_UINT8'},
        ]
    },
    [ZiGateMessageCode.SimpleDescriptorResponse]: {
        response: [
            {name: 'sourceEndpoint', parameterType:'UINT8'}, //<source endpoint: uint8_t>
            {name: 'profile ID', parameterType:'UINT8'}, // <profile ID: uint16_t>
            {name: 'clusterID', parameterType:'UINT16'}, // <cluster ID: uint16_t>
            {name: 'attributeList', parameterType:'LIST_UINT16BE'}, // <attribute list: data each entry is uint16_t>
        ]
    },
    [ZiGateMessageCode.ManagementLQIResponse]: {






        response: [
            {name: 'sequence', parameterType:'UINT8'}, // <Sequence number: uint8_t>
            {name: 'status', parameterType:'UINT8'}, // <status: uint8_t>
            {name: 'neighbourTableEntries', parameterType:'UINT8'}, // <Neighbour Table Entries : uint8_t>
            {name: 'neighbourTableListCount', parameterType:'UINT8'}, // <Neighbour Table List Count : uint8_t>
            {name: 'startIndex', parameterType:'UINT8'}, // <Start Index : uint8_t>
            // @TODO list TYPE
            // <List of Entries elements described below :>
            // Note: If Neighbour Table list count is 0, there are no elements in the list.
            {name: 'NWKAddress', parameterType:'UINT16BE'}, // NWK Address : uint16_t
            {name: 'Extended PAN ID', parameterType:'UINT64'}, // Extended PAN ID : uint64_t
            {name: 'IEEE Address', parameterType:'IEEEADR'}, // IEEE Address : uint64_t
            {name: 'Depth', parameterType:'UINT8'}, // Depth : uint_t
            {name: 'linkQuality', parameterType:'UINT8'}, // Link Quality : uint8_t
            {name: 'bitMap', parameterType:'UINT8'}, // Bit map of attributes Described below: uint8_t
            // bit 0-1 Device Type
            // (0-Coordinator 1-Router 2-End Device)
            // bit 2-3 Permit Join status
            // (1- On 0-Off)
            // bit 4-5 Relationship
            // (0-Parent 1-Child 2-Sibling)
            // bit 6-7 Rx On When Idle status
            // (1-On 0-Off)
            {name: 'srcAddress', parameterType:'UINT16'}, // <Src Address : uint16_t> ( only from v3.1a)
        ]
    },
};
