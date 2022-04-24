import {
	intArg,
	makeSchema,
	nonNull,
	objectType,
	stringArg,
	inputObjectType,
	arg,
	asNexusMethod,
	enumType,
} from "nexus";

import * as gqlTypes from "nexus-prisma";

import { DateTimeResolver } from "graphql-scalars";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
	name: "Query",
	definition(t) {
		t.nonNull.list.nonNull.field("users", {
			type: "User",
			resolve: (_parent, _args, context) => {
				return context.prisma.user.findMany();
			},
		});
	},
});

// add userType as field

const User = objectType({
	name: "User",
	definition(t) {
		t.field(gqlTypes.User.id);
		t.field(gqlTypes.User.username);
		t.field(gqlTypes.User.password);
	},
});

export const schema = makeSchema({
	types: [Query, User],
	outputs: {
		schema: __dirname + "/../schema.graphql",
		typegen: __dirname + "/generated/nexus.ts",
	},
	contextType: {
		module: require.resolve("./context"),
		export: "Context",
	},
	sourceTypes: {
		modules: [
			{
				module: "@prisma/client",
				alias: "prisma",
			},
		],
	},
});
