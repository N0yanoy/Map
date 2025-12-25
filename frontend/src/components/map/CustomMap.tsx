import { Map, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM } from "../../common/constants";
import { useTasks } from "../../api/hooks/useTasks";
import { useTasksStore } from "../../store/tasksStore";
import type { TaskDTO, TaskStatus } from "../../types/tasks";

import { MapShell } from "./mapStyles";
import { CreateTaskDialog } from "../tasks/dialogs/CreateTaskDialog";
import { TaskInfoDialog } from "../tasks/dialogs/TaskInfoDialog";
import { TasksSidebar } from "../tasks/TasksSidebar";

const VISIBLE_ON_MAP: TaskStatus[] = ["TODO", "IN_PROGRESS"];

export const CustomMap = () => {
  const { data: tasks } = useTasks();

  const {
    selectedTask,
    selectTask,
    createCoords,
    openCreateAt,
    closeCreate,
  } = useTasksStore();

  const visibleTasks = (tasks ?? []).filter((t) => VISIBLE_ON_MAP.includes(t.status));

  return (
    <MapShell style={{ display: "flex" }}>
      {/* Sidebar */}
      <TasksSidebar tasks={tasks ?? []} />

      {/* Map */}
        <Map
        style={{ flex: 1 }}
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
          {visibleTasks.map((task: TaskDTO) => {
            const [lng, lat] = task.location.coordinates;

            return (
              <Marker
                key={task.id}
                longitude={lng}
                latitude={lat}
                
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  selectTask(task);
                }}
              />
            );
          })}
        </Map>

      <CreateTaskDialog coords={createCoords} onClose={closeCreate} />

      <TaskInfoDialog task={selectedTask} onClose={() => selectTask(null)} />
    </MapShell>
  );
};
