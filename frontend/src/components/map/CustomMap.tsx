import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM } from "../../common/constants";
import { useTasks } from "../../api/hooks/useTasks";
import { useTasksStore } from "../../store/tasksStore";
import type { TaskDTO } from "../../types/tasks";

import { MapShell } from "./mapStyles";
import { CreateTaskDialog } from "../tasks/CreateTaskDialog";
import { TaskInfoDialog } from "../tasks/TaskInfoDialog";

export const CustomMap = () => {
  const { data: tasks } = useTasks();

  const {
    selectedTask,
    selectTask,
    createCoords,
    openCreateAt,
    closeCreate,
  } = useTasksStore();

  return (
    <MapShell>
      <Map
        initialViewState={{
          longitude: MAP_LONGITUDE,
          latitude: MAP_LATITUDE,
          zoom: MAP_ZOOM,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        onContextMenu={(e) => {
          e.preventDefault();
          openCreateAt({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        }}
      >
        {tasks?.map((task: TaskDTO) => {
          const [lng, lat] = task.location.coordinates;
          return (
            <Marker
              key={task.id}
              longitude={lng}
              latitude={lat}
              color="#354458"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                selectTask(task);
              }}
            />
          );
        })}
      </Map>

      <CreateTaskDialog coords={createCoords} onClose={closeCreate} />

      <TaskInfoDialog
        task={selectedTask}
        onClose={() => selectTask(null)}
      />
    </MapShell>
  );
};
