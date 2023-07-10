import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { advertisementScriptValidationSchema } from 'validationSchema/advertisement-scripts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.advertisement_script
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAdvertisementScriptById();
    case 'PUT':
      return updateAdvertisementScriptById();
    case 'DELETE':
      return deleteAdvertisementScriptById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAdvertisementScriptById() {
    const data = await prisma.advertisement_script.findFirst(
      convertQueryToPrismaUtil(req.query, 'advertisement_script'),
    );
    return res.status(200).json(data);
  }

  async function updateAdvertisementScriptById() {
    await advertisementScriptValidationSchema.validate(req.body);
    const data = await prisma.advertisement_script.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAdvertisementScriptById() {
    const data = await prisma.advertisement_script.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
