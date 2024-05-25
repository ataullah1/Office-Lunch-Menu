import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function QuerySkeleton() {
  return (
    <div className="">
      <div className="md:min-w-full justify-center max-w-[500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 xl:gap-6 mx-auto text-center">
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto min-w-full min-h-[580px]">
          <Card sx={{ minHeight: 580, m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={30}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="50%" />}
            />
            <Skeleton
              sx={{ height: 224 }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} />
                <Skeleton animation="wave" height={20} width="70%" />
                <div className="flex justify-between pt-5">
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                  <Skeleton animation="wave" height={50} width="20%" />
                </div>
              </React.Fragment>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <Skeleton animation="wave" height={40} width="20%" />
      </div>
    </div>
  );
}
